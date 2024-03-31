import { CiUser } from 'react-icons/ci';
import { RiLockPasswordLine } from 'react-icons/ri';
import Logo from '../../../../assets/logo.png';
import { Link } from 'react-router-dom';

type Props = {};

function LogInCard({}: Props) {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-96'>
        <div className='flex flex-row items-center justify-center'>
          <img src={Logo} alt='Logo' className='w-24 h-24 mb-8' />
        </div>

        <h1 className='text-2xl font-bold mb-6 text-center'>Login</h1>
        <div className='mb-4 flex items-center border-b border-gray-300'>
          <CiUser className='text-gray-500 mr-2' />
          <input
            type='text'
            placeholder='Username'
            className='w-full py-2 outline-none'
          />
        </div>
        <div className='mb-6 flex items-center border-b border-gray-300'>
          <RiLockPasswordLine className='text-gray-500 mr-2' />
          <input
            type='password'
            placeholder='Password'
            className='w-full py-2 outline-none'
          />
        </div>

        <Link to='/dashboard'>
          <button
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md w-full'
            onClick={() => {
              console.log('Sign In clicked');
            }}
          >
            Sign In
          </button>
        </Link>
      </div>
    </div>
  );
}

export default LogInCard;
