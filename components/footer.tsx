import Image from "next/image";

function Footer() {
  return (
    <div className="h-[calc(100vh-100px)] bg-[#222] flex overflow-hidden justify-center p-4 md:flex-row flex-col text-center md:text-left">
      {/* Background Image Section */}
      <div className="flex-1 relative hidden md:flex">
        <Image src="/img/bg.png" fill alt="bg" className="object-cover" />
      </div>

      {/* Content Section */}
      <div className="flex-2 flex flex-col md:flex-row justify-between p-12">
        {/* Motto Card */}
        <div className="flex-1 px-5">
          <h2 className="text-center text-gray-300">{`"Get a slice of heaven with every bite"`}</h2>
        </div>

        {/* Restaurant Locations Card */}
        <div className="flex-1 px-5">
          <h1 className="text-lg text-[#b7903c]">FIND OUR RESTAURANTS</h1>
          <p className="text-gray-400">
            1654 R. Pizza Street #304.
            <br />
            Kathmandu, 858022
            <br /> (977) 111 - 0101
          </p>
          <p className="text-gray-400">
            1654 R. Pizza Street #304.
            <br />
            Kathmandu, 858022
            <br /> (977) 012 - 345
          </p>
          <p className="text-gray-400">
            1654 R. Pizza Street #304.
            <br />
            Kathmandu, 858022
            <br /> (977) 4531 - 012
          </p>
          <p className="text-gray-400">
            1654 R. Pizza Street #304.
            <br />
            Kathmandu, 858022
            <br /> (977) 867 - 1010
          </p>
        </div>

        {/* Working Hours Card */}
        <div className="flex-1 px-5">
          <h1 className="text-lg text-[#b7903c]">WORKING HOURS</h1>
          <p className="text-gray-400">
            MONDAY UNTIL FRIDAY
            <br /> 9:00 - 22:00
            <br />
            SATURDAY - SUNDAY
            <br /> 12:00 - 24:00
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;