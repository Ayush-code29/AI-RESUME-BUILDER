import { ArrowLeftIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom'

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
  return (
    <div>
      <div>
        <Link to='/app' className='inline-flex gap-2 items-center text-slate-500 hover:text-slate-700 transition-all'>
          <ArrowLeftIcon className='size-4'/> Back to Dashboard
        </Link>
      </div>
    </div>
  )
}

export default ResumeBuilder