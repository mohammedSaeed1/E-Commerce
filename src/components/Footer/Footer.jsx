import amazonLogo from '../../assets/images/Amazon-Pay-logo.svg'
import americanexpressLogo from '../../assets/images/american-express.svg'
import mastercardLogo from '../../assets/images/mastercard.svg'
import paypalLogo from '../../assets/images/paypal.svg'
import visaLogo from '../../assets/images/visa.svg'
import googleplayLogo from '../../assets/images/appstore-btn.svg'
import appstoreLogo from '../../assets/images/googleplay-btn.svg'

export default function Footer(){
    
return (
    <>
      <footer className="bg-slate-100 dark:bg-[#1B1B1F] pt-10 py-3">

        <header className='px-5'>
       <h2 className='text-slate-800 dark:text-white text-2xl sm:text-3xl font-semibold '>Get the Fresh Cart App</h2>
       <p className='text-slate-400 py-3'>We will send you a link , open it on your phone to download the app</p>
        </header>
         
      <div className='md:flex md:items-center md:justify-between border-y-2 border-gray-200 gap-3 px-4'>

     <div className="payment flex items-center gap-3">
      <h3 className='font-medium dark:text-white'>Payment Partners</h3>
       <img src={amazonLogo} alt="amazon payment" className='w-12 cursor-pointer' />
       <img src={mastercardLogo} alt="mastercard payment" className='w-12 cursor-pointer' />
       <img src={paypalLogo} alt="paypal payment" className='w-12 cursor-pointer' />
       <img src={americanexpressLogo} alt="american express payment" className='w-12 cursor-pointer' />
       <img src={visaLogo} alt="visa payment" className='w-12 cursor-pointer' />
     </div>

     <div className="download flex items-center gap-3">
      <h3 className='font-medium dark:text-white'>Get Deliveries with FreshCart</h3>
       <img src={googleplayLogo} alt="Google Play download" className='w-24 cursor-pointer' />
       <img src={appstoreLogo} alt=" APP Store download" className='w-24 cursor-pointer' />
     </div>

      </div>
     

      </footer>
      
    
    </>
)


}