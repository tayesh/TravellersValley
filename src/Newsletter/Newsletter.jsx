

const Newsletter = () => {
    return (
        <div>
            {/* <div className="hero min-h-screen ">
                <div className=" flex-col lg:flex-row-reverse">
                    <img src="https://i.ibb.co/BNT8kRH/daily-deals-sign-or-stamp-on-white-background-vector-illustration-J4-NHN2.png" className="max-w-sm rounded-lg" />
                    <div>
                        <h1 className="text-5xl font-bold">Subscribe</h1>
                        <p className="py-6 text-xl">Subscribe now to unlock a treasure trove of regular updates and exclusive deals,<br /> ensuring you never miss a beat in the world of savings and discoveries! <br /> Join our community and embark on a journey of endless possibilities <br /> and unbeatable offers.</p>
                        <button className="btn btn-primary">Get Started</button>
                    </div>
                </div>
            </div> */}
            <div className="flex items-center gap-10 p-10">
                <div className="">
                    <h1 className="text-5xl font-bold pon text-center">Subscribe</h1>
                    <p className="py-6 text-xl flex-wrap text-center bhand">Subscribe now to unlock a treasure trove of regular <br /> updates and exclusive deals, ensuring you never miss <br /> a beat in the world of savings and discoveries! <br />  Join our community and embark on a journey of <br /> endless possibilities and unbeatable offers.</p>

                </div>
                <img src="https://i.ibb.co/BNT8kRH/daily-deals-sign-or-stamp-on-white-background-vector-illustration-J4-NHN2.png" className="max-w-sm rounded-lg" />
                <div className=" flex-grow">
                    <h2 className="text-3xl font-semibold text-center mb-7 pon">Get Hot Deals !!!</h2>
                    <label className="input input-bordered flex items-center gap-2">
                        Email
                        <input type="text" className="grow" placeholder="daisy@site.com" />
                    </label>
                    <div className="flex justify-center">
                        <button className="bg-[#ffa43d] px-5 py-3 rounded mt-7 text-center">Subscribe</button>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Newsletter;