// import React from 'react';
// // import { Link } from 'react-router-dom';

// const Home = () => {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="text-center">
//         <h1 className="text-4xl font-bold mb-4">Welcome to Image Management</h1>
//         {/* <Link to="/login" className="mr-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Login</Link>
//         <Link to="/register" className="p-2 bg-green-500 text-white rounded hover:bg-green-600">Register</Link> */}
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from 'react';
import { motion } from 'framer-motion';
import bg from './pics/bg.png'
const Home = () => {
  return (
    <div className="relative overflow-hidden min-h-screen bg-gray-300 flex flex-col items-center">
      <div className="relative z-10 text-center p-6 bg-gray-200 bg-opacity-70 rounded-lg shadow-lg mt-10">
        <img src={bg} alt="" className='mx-auto'/>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-bold mb-4"
        >
          Welcome to ImageManager
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-lg w-3/4 mx-auto text-wrap mb-8"
        >
          Manage and organize your images effortlessly. Upload, categorize, and explore your visual assets like never before.
        </motion.p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} ImageManager. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

