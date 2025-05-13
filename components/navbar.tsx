import Image from "next/image";
import Link from "next/link";
import AuthContainer from "./auth/auth-container";
import CartIcon from "./cart-icon";

function Navbar() {
	return (
		<div className="h-[100px] px-8 bg-[#d1411e] flex items-center justify-between sticky top-0 z-[9] overflow-hidden">
			{/* Call Button Section */}
			<div className="flex-1 flex items-center">
				<div className="bg-white rounded-full p-2 w-[50px] h-[50px] flex items-center justify-center">
					<Image src="/img/telephone.png" alt="" width="32" height="32" />
				</div>
				<div className="ml-5 text-white">
					<div className="text-[12px] font-medium">ORDER NOW!</div>
					<div className="text-[20px] font-bold">0123456789</div>
				</div>
			</div>

			{/* Navigation Links */}
			<div className="flex-3 hidden md:flex">
				<ul className="flex items-center list-none text-white">
					<Link href="/">
						<li className="mx-5 font-medium cursor-pointer transition-all duration-200 hover:brightness-90">
							Homepage
						</li>
					</Link>
					<li className="mx-5 font-medium cursor-pointer transition-all duration-200 hover:brightness-90">
						Product
					</li>
					<li className="mx-5 font-medium cursor-pointer transition-all duration-200 hover:brightness-90">
						Menu
					</li>
					<li className="mx-5 pt-4">
						<Image src="/img/newone.png" alt="" width="130" height="139" />
					</li>
					<li className="mx-5 font-medium cursor-pointer transition-all duration-200 hover:brightness-90">
						Events
					</li>
					<li className="mx-5 font-medium cursor-pointer transition-all duration-200 hover:brightness-90">
						Blog
					</li>
					<li className="mx-5 font-medium cursor-pointer transition-all duration-200 hover:brightness-90">
						Contact
					</li>
				</ul>
			</div>
			<div className="flex items-center gap-5">
				<AuthContainer />

				{/* Cart Section */}
				<Link href="/cart">
					<div className="flex-1 flex justify-end">
						<div className="relative">
							<Image src="/img/cart.png" alt="" width="30" height="30" />
							<CartIcon />
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Navbar;