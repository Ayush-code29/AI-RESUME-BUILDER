import { ArrowLeftIcon, Briefcase, ChevronLeft, FileText, FolderIcon, GraduationCap, Sparkles, User, UserIcon,ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'
import PersonalInfoForm from '../components/PersonalInfoForm'

const ResumeBuilder = () => {
  const {resumeId} = useParams()
  const [resumedata,setresumedata] = useState({_id:"",title:"" , personal_info:{},professional_summary:"",experience:[],education:[],project:[],skills:[],template:"classic",accent_color:"#3BB2F6",public:false})
  const loadexistingresume = async ()=>{
    const resume = dummyResumeData.find(resume => resume._id == resumeId)
    if(resume){
      setresumedata(resume)
      document.title = resume.title
    }

  }
  useEffect(()=>{
    loadexistingresume()
  },[])
  const [activeSectionIndex,setactiveSectionIndex] = useState(0);
  const [removeBackground,setremoveBackground] = useState(false);

  const sections = [{id:"personal",name:"Personal Info", icon:User},
    {id:"summary",name:"Summary", icon:FileText},
    {id:"experience",name:"Experience", icon:Briefcase},
    {id:"education",name:"Education", icon:GraduationCap},
    {id:"projects",name:"Projects", icon:FolderIcon},
    {id:"skills",name:"Skills", icon:Sparkles},

  ]
  const activeSection = sections[activeSectionIndex]
  return (
    <div>
      <div>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4'/> Back to Dashboard
        </Link>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-8'>
        <div className='grid lg:grid-cols-12 gap-8'>
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1'>
            <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
            <hr className='absolute top-0 left-0 h-1 bg-linear-to-r from-green-500 to green-600 border-none transition-all duration-2000' style={{width:`${activeSectionIndex * 100 / (sections.length - 1)}%`}} />
            <div className='flex justify-between items-center mb-6 border-b border-gray-300 py-1'>
              <div></div>
              <div className='flex items-center'>
                {activeSectionIndex!=0 && (<button onClick={()=>setactiveSectionIndex((prevIndex)=>Math.max(prevIndex-1,0))} disabled={activeSectionIndex===0} className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all'><ChevronLeft className='size-4'></ChevronLeft>Previous</button>)}
                <button onClick={()=>setactiveSectionIndex((prevIndex)=>Math.min(prevIndex+1,sections.length - 1))} disabled={activeSectionIndex=== sections.length-1} className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`}><ChevronRight className='size-4'></ChevronRight>Next</button>
              </div>
            </div>
            <div className='space-y-6'>
              {activeSection.id==='personal' && (
                <PersonalInfoForm data={resumedata.personal_info} onchange={(data)=>setresumedata(prev=>({...prev,personal_info:data}))} removebackground={removeBackground} setremovebackground={setremoveBackground}/>
              )}

            </div>
            </div>
          </div>
          {/* right panel */}
          <div></div>
          
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder