import '../styles/prem.css';
import logo from '../assets/yt-music-logo copy2.png'
import { Button } from '@mui/material';
const Prem=()=>{
    return<>
    <div className="prem-container">
    <div className="prem-Subcontainer">
       <div>
       <img className='logotini'src={logo} alt="logo" />
       <p>Individual Membership</p>
       </div>
       <div>
        <h5>Pre-paid plans</h5>
        <p>Pay up front. Top up anytime. We accept many forms of payment, including UPI.</p>
        
            <li className='premPrice'>
                <h5>12-month <span>Best seller</span></h5>
                <p>₹990.00</p>
            </li>
            <li className='premPrice'>
                <h5>3-month </h5>
                <p>₹309.00</p>
            </li>
            <li className='premPrice'>
                <h5>1-month </h5>
                <p>₹109.00</p>
            </li>
     
       </div>
        <div>
        <h5>Subscription plan</h5>
        <p>Automatic payments such as credit cards are required. Billing recurs monthly. Cancel anytime.</p>  
        <div className='free'>
            <div >
                <h5>Monthly subscription</h5>
                <p>1 month free<br/>
₹99/month after trial</p>
            </div>
            <Button variant='contained'>1 month free</Button>
        </div>
        <p>Restrictions apply to certain features and vary by device, geographical location of the user, and others. Learn more <br />
Only first-time YouTube Red, YouTube Premium, YouTube Music Premium and Google Play Music subscribers are eligible for trials, introductory offers or promotional pricing. Except for Google Workspace Individual edition accounts, Google Workspace accounts are not eligible for trials unless they are signing up for Student subscriptions. Users can only sign up for one trial per payment method. Learn more <br /> here.
You’ll be automatically charged the price listed unless you cancel during your trial, and then every month starting on the first billing date until you cancel your subscription. Cancel anytime. No refunds or credits for partial billing periods. Refund policy <br />
Family subscription: Invite up to 5 additional family members to join your Google family group and share your YouTube Music Premium and YouTube Premium subscription. All family members must be age 13 or older, have a Google Account, and reside in the same household as the family manager. Family subscriptions are available in select countries. Learn more <br />
Student subscription: Sign up for either a YouTube Music Premium or YouTube Premium membership as a student and get all the same benefits at a discounted rate. YouTube student memberships are only available to full-time students at higher education institutions in select countries, and eligibility will be verified by a third-party verification service. Learn more <br />
Pre-paid plans: You can make a single-time purchase of a YouTube Premium or YouTube Music Premium individual membership for a fixed time period on a non-recurring basis using the pre-paid plans. Once the time period you purchased ends, the pre-paid plan will automatically terminate and you will lose access to your benefits. To maintain access to your benefits, you will need to make another purchase with options provided by your billing platform or switch to a different plan. You may have up to 24 months of pre-paid access. <br />
You may contact our support team to terminate access to the prepaid plan. Note that once your access is terminated, you will no longer have access to your benefits. No partial refunds are available. Learn more <br />
Pre-paid plans are currently available on Android and Web in select locations. Learn more <br />
Pre-paid plans cannot be combined with other YouTube Premium or YouTube Music Premium offers including family or student subscription and free trials. Pre-paid plans can be subject to limited time introductory offers. <br />
Playback: You must have an Internet connection to stream videos or to download them. Supported devices <br />
By completing your purchase, you verify that you are at least 18 years old and agree to these terms. <br />
Price may vary by user. Google reserves the right to change the price at any time. For accepted payment methods, see here.</p>
        </div>




    </div>   
    </div>
    </>
}
export default Prem;