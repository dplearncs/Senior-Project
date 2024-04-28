import React, {useState} from 'react';
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { HiMenuAlt1 } from "react-icons/hi";
import BoxLogo from './logo.png'
import { TypeAnimation } from 'react-type-animation';
import { Navigate, Link } from 'react-router-dom';


const Navbar = () => {
const [nav, setNav] = useState(false)

  return (
    <div className='bg-black h-screen'>
    <div className='mx-auto flex justify-between items-center p-4 bg-black  rounded-full '>
      {/* Left side */}
      <div className='flex items-center text-white'>
        <div onClick={()=> setNav(!nav)} className='cursor-pointer'>
        <HiMenuAlt1 size={30} />
        </div>
        <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2 cursor-pointer'>
          Tally<span className='font-bold'>Crate</span>
          
        </h1>
        <div><img src={BoxLogo} className='h-11'/></div>
      </div>

      <div className='flex'>
      
      <Link to="/login">
      <button 
      className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-white after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10 text-white">
         Log in
      </button>
      </Link>
      </div>
      
      {/* Overlay */}
      {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
      
      {/* Side drawer menu */}
      <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300 ' }>
        <AiOutlineClose
            onClick={()=> setNav(!nav)}
          size={30}
          className='absolute right-4 top-4 cursor-pointer'
        />
        <h2 className='text-2xl p-4 cursor-pointer'>
          Tally<span className='font-bold'>Crate</span>
        </h2>
        <nav>
            <ul className='flex flex-col p-4 text-gray-800'>
                <li><a className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10">Contact us</a></li>
                <li><a className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10">View inventories</a></li>
                <li ><a className="py-4 cursor-pointer relative text-xl w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-black after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left mr-10">Log out</a></li>
            </ul>
        </nav>
      </div>
    </div>
    {/*hero section*/}
    <div class="flex text-blue-400 text-9xl size-2em  bg-[url('https://img.freepik.com/free-photo/close-up-warehouse-view_23-2148923142.jpg?t=st=1712775495~exp=1712779095~hmac=28eed57d40cee743ab53eb5208d0b0b4a96094ad42f2170e6571b95ac96b94c9&w=1800')] 
            bg-cover
            bg-no-repeat
            bg-center h-screen text-center items-center">
    <div className="flex h-screen text-white text-9xl h-2em mr-9 items-center">We help track inventories for</div>
    <TypeAnimation
      sequence={[
        // Same substring at the start will only be typed out once, initially
        ' everyone.',
        3000, // wait 1s before replacing "Mice" with "Hamsters"
        ' home.',
        3000,
        ' offices.',
        3000
      ]}
      wrapper="p"
      speed={35}
      style={{ fontSize: '1em', display: 'flex-end'}}
      repeat={Infinity}
    />
</div>
    </div>
  );
};

export default Navbar;