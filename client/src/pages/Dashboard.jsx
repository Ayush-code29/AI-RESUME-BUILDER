import {
  FilePenLineIcon,
  PlusIcon,
  UploadCloudIcon,
  PencilIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
const Dashboard = () => {
  const colors = [
    "#9333ea",
    "#d97706",
    "#dc2626",
    "#0284c7",
    "#16a34a",
  ];
  

  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume,setshowCreateResume] = useState(false);
  const [showUploadResume,setshowUploadResume] = useState(false);
  const [title,settitle] = useState('');
  const [resume,setresume] = useState(null);
  const [editResumeId,seteditResumeId] = useState('');
  const navigate = useNavigate()
  const createResume = async (event)=>{
    event.preventDefault()
    setshowCreateResume(false)
    navigate('/app/builder/res123')

  }



  const loadAllResumes = async () => {
    const resumes = [
      {
        id: 1,
        title: "Software Developer Resume",
        updatedAt: "2026-10-01",
      },
      {
        id: 2,
        title: "Frontend Developer Resume",
        updatedAt: "2026-09-28",
      },
      {
        id: 3,
        title: "MERN Stack Resume",
        updatedAt: "2026-09-25",
      },
    ];

    setAllResumes(resumes);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  const handleEdit = (resume) => {
    console.log("Edit resume:", resume);
  };

  const handleDelete = (resume) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${resume.title}"?`
    );

    if (!confirmDelete) return;

    setAllResumes((prevResumes) =>
      prevResumes.filter((item) => item.id !== resume.id)
    );
  };

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Welcome */}
        <p className="text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Ayush
        </p>

        {/* Create and Upload Resume */}
        <div className="flex gap-4">

          {/* Create Resume */}
          <button onClick={()=>{
            setshowCreateResume(true)
          }}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <PlusIcon className="size-11 p-2.5 bg-linear-to-br from-indigo-600 to-indigo-800 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-indigo-600 transition-all duration-300">
              Create Resume
            </p>
          </button>

          {/* Upload Existing */}
          <button
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
          >
            <UploadCloudIcon className="size-11 p-2.5 bg-linear-to-br from-purple-600 to-purple-800 text-white rounded-full transition-all duration-300" />

            <p className="text-sm group-hover:text-purple-600 transition-all duration-300">
              Upload Existing
            </p>
          </button>
        </div>

        {/* Divider */}
        <hr className="border-slate-300 my-6 sm:w-[350px]" />

        {/* Resume Cards */}
        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];

            return (
              <div
                key={resume.id}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: `${baseColor}40`,
                }}
              >
                {/* Edit & Delete Buttons */}
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">

                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(resume)}
                    className="p-1.5 bg-white rounded-md shadow-sm hover:bg-slate-100 transition-all cursor-pointer"
                    title="Edit Resume"
                  >
                    <PencilIcon
                      className="size-3.5"
                      style={{ color: baseColor }}
                    />
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(resume)}
                    className="p-1.5 bg-white rounded-md shadow-sm hover:bg-red-50 transition-all cursor-pointer"
                    title="Delete Resume"
                  >
                    <Trash2Icon className="size-3.5 text-red-500" />
                  </button>

                </div>

                {/* Resume Icon */}
                <FilePenLineIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{ color: baseColor }}
                />

                {/* Resume Title */}
                <p
                  className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                  style={{ color: baseColor }}
                >
                  {resume.title}
                </p>

                {/* Updated Date */}
                <p
                  className="absolute bottom-1 text-[11px] px-2 text-center"
                  style={{ color: `${baseColor}90` }}
                >
                  Updated on{" "}
                  {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </div>
            );
          })}
        </div>
        {showCreateResume && (<form onSubmit={createResume} onClick={()=>{
          setshowCreateResume(false)
        }} className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
        <div onClick={e => e.stopPropagation()} className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
          <h2 className="text-xl font-bold mb-4">Create a Resume</h2>
          <input type="text" placeholder="Enter resume title" className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600" required />
          <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">Create Resume</button>
          <XIcon className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors" onClick={()=>
            {setshowCreateResume(false); settitle('')}
          }/>
        </div>
        </form>)}
      </div>
    </div>
  );
};

export default Dashboard;