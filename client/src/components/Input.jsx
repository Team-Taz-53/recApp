
export const Input =({placeholder, setValue})=>{
    //passed setValue from the parent to save the input value
    //the value variable located with the parent
    //function that runs on change saving the input value
    const saveValue =(e)=>{
        setValue(e.target.value)
    }
    return (
            <div className="input">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="search"
          placeholder={placeholder}
          required
          onChange={saveValue}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
        
    )
}