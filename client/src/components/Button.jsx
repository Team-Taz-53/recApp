

export const Button =({label,onClick})=>{
   return (
    <button
    onClick={onClick}
     className='bg-[var(--btn-bg)] 
     hover:bg-[var(--btn-hover)] 
     text-white 
     font-bold 
     py-2 
     px-4 
     rounded'
>{label}</button>
   )
}