import { FilePenIcon, FilePenLineIcon, PlusIcon, UploadCloudIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ModernTemplate from '../assets/assets'

const Dashboard = () => {
  const colors = ['#9333ea','#d97706','#dc2626','#0284c7','#16a34a']
  const [allResumes,setallResumes] = useState([])
  const loadAllResumes = async () =>{
    setallResumes(ModernTemplate)
  }
  useEffect(()=>{
    loadAllResumes()

  },[])
  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <p className='text-2xl font-medium mb-6 bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden'>Welcome, Ayush</p>
        <div className='flex gap-4'>
          <button className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <PlusIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-indigo-600 to indigo-800 text-white rounded-full'/>
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>
          <button className='w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer'>
            <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-linear-to-br from-purple-600 to purple-800 text-white rounded-full'/>
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Upload Existing</p>
          </button>

        </div>
        <hr className='border-slate-300 my-6 sm:w-[350px]'/>
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes.map((resume,index)=>{
            const basecolor = colors[index%colors.length];
            return(
              <button key={index} className='relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300 cursor-pointer' style={{background:`linear-gradient(135deg,${basecolor}10,${basecolor}40)`,borderColor:basecolor+'40'}}>
                <FilePenLineIcon className='size-7 group-hover:scale-105 transition-all' style={{color:basecolor}}/>
                <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{color:basecolor}}>{resume.title}</p>
                <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center' style={{color:basecolor+'90'}}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
                <div>
                  
                </div>
              </button>
            )

          })}
        </div>
      </div>
    </div>
  )
}

export default Dashboard