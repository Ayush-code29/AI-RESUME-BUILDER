const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const DEFAULT_MODEL = "gemini-3.8-flash";
const REQUEST_TIMEOUT_MS = 25000;

const createError = (message, statusCode) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

/**
 * Gemini 2.5 Flash "thinks" before answering, which is slow and wastes tokens
 * for a simple rewrite. Turning thinking off (budget 0) is only allowed on
 * the Flash models, so we only send it for those.
 */
const supportsThinkingOff = (model) => /^gemini-2\.5-flash/.test(model);

/**
 * Sends one prompt to Gemini and returns the plain text answer.
 * The API key stays on the server and is never sent to the browser.
 *
 * Set `json: true` together with `jsonSchema` to force valid JSON output.
 */
const askGemini = async ({
  system,
  prompt,
  maxTokens = 1024,
  json = false,
  jsonSchema,
}) => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw createError(
      "AI enhancement is not configured on the server.",
      503
    );
  }

  const model = (process.env.GEMINI_MODEL || DEFAULT_MODEL)
    .trim()
    .replace(/^models\//, "");

  const generationConfig = {
    temperature: 0.3,
    maxOutputTokens: maxTokens,
  };

  if (supportsThinkingOff(model)) {
    generationConfig.thinkingConfig = { thinkingBudget: 0 };
  }

  if (json) {
    generationConfig.responseMimeType = "application/json";

    if (jsonSchema) {
      generationConfig.responseSchema = jsonSchema;
    }
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response;

  try {
    response = await fetch(
      `${API_BASE}/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Header (not ?key=) so the key never shows up in URLs or logs.
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: system }] },
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          generationConfig,
        }),
        signal: controller.signal,
      }
    );
  } catch (error) {
    throw createError(
      error.name === "AbortError"
        ? "The AI service took too long to respond. Please try again."
        : "Could not reach the AI service. Please try again.",
      502
    );
  } finally {
    clearTimeout(timer);
  }

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    console.error(`Gemini API error ${response.status}:`, details);

    if (response.status === 429) {
      throw createError(
        "The AI service is busy right now. Please try again in a moment.",
        429
      );
    }

    // 400 / 403 here usually means a wrong API key or model name.
    // The real reason is printed in the server console above.
    throw createError(
      "The AI service is unavailable right now. Please try again.",
      502
    );
  }

  const result = await response.json().catch(() => null);

  const blockReason = result?.promptFeedback?.blockReason;

  if (blockReason) {
    throw createError(
      "The AI could not process this text. Please rephrase it and try again.",
      422
    );
  }

  const candidate = result?.candidates?.[0];

  const text = Array.isArray(candidate?.content?.parts)
    ? candidate.content.parts
        .filter((part) => typeof part.text === "string" && !part.thought)
        .map((part) => part.text)
        .join("")
        .trim()
    : "";

  if (!text) {
    const reason = candidate?.finishReason;

    throw createError(
      reason === "SAFETY"
        ? "The AI could not process this text. Please rephrase it and try again."
        : "The AI service returned an empty response. Please try again.",
      reason === "SAFETY" ? 422 : 502
    );
  }

  return text;
};

module.exports = { askGemini };