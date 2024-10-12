import { useState } from 'react'
//import { Input } from "@/components/ui/input"
import {Input} from './components/ui/input'; // Adjust based on your structure

//import { Button } from "@/components/ui/button"
import {Button} from './components/ui/button';

import { motion } from "framer-motion"
import { Sparkles, CheckCircle, XCircle } from "lucide-react"

// Hardcoded list of eligible addresses
const ELIGIBLE_ADDRESSES = [
  "0xf5b6F869D96164c323C12b7ba8739B2fb20e8EDc",
"0xa044e8a1535b51ceaad88da7d7bf1296210d5975",
"0xb07ad6655cb6427eab7475b77eb0b73fca540199",
"0x8338aDD602bc084BFA24724f15f9f9d1eE3cE721",
"0x29900546817e26373380ac9e5f988cc4811bb014",
"0x5E703f2aed804022e959Aeba7F23C1F22E66715f",
"0xc10097364902857E9d94e1db263d84D1e706F322",
"0x51314712856f8fB4A00C9a663b2adf8aDE203A19",
"0x98c60eaC126499a0BA2D748c6293f22f0C62f0fa",
"0x06D7908Eb0508dC583A8C29961173Ab6269DEaa5",
"0xf5b6F869D96164c323C12b7ba8739B2fb20e8EDc",
"0xf5b6F869D96164c323C12b7ba8739B2fb20e8EDc",
"0x4AB0324747Df2e5564B7b3e6940Eb48E6837ADD9",
"0xc5660dd00ae021915Dc7b911CdC2B9944A2456ea",
"0xF7B861fba42096fE5Cf194286e9a4786230A1E9F",
"0x1eE4307785d853Ca1ff7E56fe7e1aeA808Ff14A0",
"0x15B39A24dAf40043f66Ce8D0f6667A0968DaC7b3",
"0x7BEE10a601D3473C524e4E5E94f1DE2911f1Be12",
"0xa4Ab04929449e808FddE215144926c7E04B534bA",
"0x90E22C430509705B9678eB1b7457223c4b879a2b",
"0x52Eff600E9a0317981C1E3EE882c4b6d6E053f5D",
"0x4e954cbffb39abbb173e4ad1307b0c776595ee12",
"0x91b02cb2336c7b78155db381bdcd2506cdaab8d8",
"0xBDB969A121D3Bd526D90996D426e815C1e88652B",
"0x34379E29ae02055cB9558DB402f0762a786cBB44",
"0x5a980e78b14338fa4b72e560498ceb3dacde5c98",
"0xEEA857F4413aF5B7eDE6e0593121A56135Fe3963",
"0x57Fb5C30560289995D1EeFf89df4F621525F6b99",
"0x545c810fddd7620a0be9fb51f03c2f91f4db8a95",
"0x92d39f00171d25104d626b3bdcde8509e413027d",
"0xc1fdbdbd3438c86e5a5a985426f94da1a02f706e",
"0xb4E8be270E2565fa9590dDDdE2E203EB203E0eF3",
"0x2a195071645748dd57459403ec94f99b432845f3",
"0xc6831fb7A653DED0b85693947995896B89eD8e00",
"0x7Ba290C6146F4deDF7D0DBb6B3f75D4E1B39fE92",
"0x30F682b2b7a0e8C72714C0Ca4AD28B40ccEF3fDF",
"0xb2b0c35500db766675335a10c2ea7adfb63c0b67",
"0x15e55917d7083f2d459a5881fc8a3be0b99a03c1",
"0x7a8c4e86d7992f88843fb4576bbefa158464663a",
"0x3b1df14f4cd4824a9485c1960f1c99e711a45925",
"0xd5a58885ed969bd968401d2f9cbb4affb4816722",
"0xF5Ec5Ca3f66dc90b4a96E958F9068caEd134c3D1",
"0xdc0a17067af73e5035087872e6a95b0b248fb23d",
"0x64882C718e047bE3599FF701DB201202c1F73ae4",
"0x0C07A8Cbc6dc88637F9781fF63D557E3d953E3BC",
"0x74f30e9992A555b9d54698ab6Df3E3f589632C16",
"0x1339e0A42957eed7d063a574b122E9E0bd691CcE",
"0x634086eCEE3dE7d4CDE8DFef8784AB209B5A45dB",
"0x08a31afe33aa3c73f8871363d153ebf1ec8042a3",
"0x99D3EB4547dd4bf3D1c4eed4115DD7B087dBa440",
"0xfEebe5cbA0D16Aceb8ccf60d5a896F4DA2141113",
"0x9029f1a23F07aB79590cF63A85540493DDA46963",
"0xAf73a2922d0624f797Abc01E256ccd226A50791f",
"0xaF949a4d41e168f738F5Ae5975458b8228c46aE4",
"0x93B47f1DDc0CDa867eEa730Cb32D9384808A99E1",
"0x035A5a55134a9fa69E7032B109c4E477540c2de8",
"0xD4D8465fE9Cef8Dd0995FbbeE87b61811416C506",
"0xFedb8e5cc87CD5E63f6abbaB898e24568BE25a90",
"0xe2Aa0Cba08cE4899Eaca3A80dc4EBa694603a31A",
"0x0e6E00DE5c4C913825cAfAC2F8f7B183FcC1A531",
"0x6b2447183111Ac2E2556e8AaA10Ace91247d5679",
"0xB6De4e0c9054EF4242c8e8e09b5a0F53fA0853c0",
"0x9b7103844b0c7c8bff5e41599ba0382d34515eb9",
"0x4FC890E6673a33F52180e2B6a5156fE4E52fA3ce",
"0x680a438e63D1Be66b14D5Fe395F4600da37d4ac1",
"0xC67b53c5A4d79d300cd48Ee180b2BDEC477082bc",
"0x96109c6149B251Af4FeE4607dA8989639C4A7dE3",
"0xFc4F7Fc01cc2128a5eB199A3E192935862f53172",
"0x9Ef6607ECa2Dcc9DD45c032f6241FeAa82693dB7",
"0x7341650db6c94593c47bec64d4ff2f9519d54e83",
"0xcdFE654bCe2e5D735f0ab0bfFc2F6fc02fCCA22b",
"0xd4ef9a2d9c367eab8aa29700967584844a5556d0",
"0x54c628a6990F0b2f3046A3cEacE6Eab1e2CBE04b",
"0x4f0d809e1bd60317b26933df1367aa8382a7b724",
"0x3abbb4a6d84def8e189573bbdd6fb2bb96836829",
"0xf98130e2739c8e150aa4de8a22ad000363adf26c",
"0x7F8F5Da84114F09b0777035d7fD5642Fad07c1f3",
"0x5b245afaa7b4cbbb464e50c253c6c72d5948a79e",
"0x96eac0befe9e654acdb8a6973432d2ece2d26c31",
"0xEf06656A58af855a509711Cd09DDF75CfcbccAC8",
"0xA0004205F2C8e88a002340d496f1EC72958fA5Cf",
"0x74B4cD6E8a47142Faf28f082767eaccB3d14691F",
"0x4bd550C85b61D0A059042BDFffe4C56c07d3a400",
"0x24867F3586148A9cA8A354B7FBD32254f2776ac5",
"0x7edFBd2D04505e74EA6Ff6C1720275a9B16A3869",
"0xcd0e69D34fB7Bb7Af50cDec4B6881Cb40985Ebea",
"0xCED74C23d35c4c5D9Efe946c21Cb2CC0127b386f",
"0x09287A4CfF1b22803Cc5AdEe5eA5b8E295ef316e",
"0x8440Dec19C345EAd10d3069f2E0C133Bb49e26a3",
"0xF3EbEf48227a8ccB7Fa376096A97448FbeF41fbe",
"0x45948a6c0e430be9780231cf87640d26db77f504",
"0xD440714d0D6ae69d56618f9E7A239AA17b3Be1F2",
"0x8F072Ac9d80Af523672d93CfcB7350f51F00b4bD",
"0xe97a6648bc52ed5e9945f7805f01a07267e83575",
"0x652735c14Cc4793091b80a28a1f0513CDD31E15E",
"0xD781Bb234b7790467C742e8d158D5C8a93a9AeEA",
"0x47C7D24F097bF6e93701b46C53C06a2E97D8616D",
"0xe9492008573363d2B3F47B194CCC39Ee8799aFDC",
"0x6f9afe4d66cb24fe5aebbd5e6d4ec2c710542779",
"0x6b1fcd4157d96c72362ecc47ecdc1cd574f8c12a",
"0x58f81c63228e4d6873819a1015014bcb48733506",
"0x31a1d5ba65218f26900eac334149d830bc1a94de",
"0x0e674ecb18fa8b55f7375a29619d0f7bd36ecbb5",
"0x3ff855f904afd705cd0df0d77768a57c29abd455",
"0x3e6298d5dc10ef1d9d7635ea58fb82a222814616",
"0x5aa79d40a9d0ad34883894bd75772d4e2b3bd21e",
"0x358e10da748d737909e2b155fdc1791586cfe2cd",
"0x05fa91c59008813c95ec49e7dbcdd8890cc99fb7",
"0x1e8116b009ae8ae174716913e1e6c24b17713c81",
"0x620051b8553a724b742ae6ae9cc3585d29f49848",
"0xf96620d2f93e9f94eefb39976e02134fe2a6b2f3",
"0x3e1ad7631f5387242db39d87f6864de5be33e36e",
"0x9eaab44f72124687eb3c087e5c8393bb8d290f8e",
"0x7cf4c6a32338958ccedc1e60e504cd68cd6e95fd",
"0x9b058b7e8247d1c89784bfd2466f758cefcf505d",
"0x4e42cb5902c9db589fd770585db6ce526469c790",
"0xb3c6144c929652d6046c01282fa2f355d9864db9",
"0x0cb27e883e207905ad2a94f9b6ef0c7a99223c37",
"0xcfed84b28ce2a07cc94b9d4319dfe3ebf6b4382c",
"0xfc7e365acb5a5f14057a9cca2950dea9356ee2d3",
"0x534684fb3f7b98c69163360130b34b347554a927",
"0x54139fda333ee0c7c6dcb8505866b800e4b5465c",
"0x8cbed6b39438576ce258a3d52e0a0a960069133a",
"0x5decb065266e006706de9ae0e8adb2f6d2ad86b3",
"0xf3c3baacdda6b57f7e45cef18886db8a226e7837",
"0xaa547deaea05872b7deaf0fdedfa466fc535f112",
"0x9836837cd7f7deb6b8c215fb3862d2762e69eb09",
"0xbe4f892bd516f53a22d3dba1ba425e36cdb9a772",
"0xeedcC4D7d9ea1C9c1d1944717a1dFc73663d7D45",
"0x50942699871757916cFD5349c1C593cF25791e85",
"0x02c176cD7d7d4c277DBe0FBfB18fF63B7e5e8C9D",
"0x2727975E8C02360B36c85b127EA5Cf45291e183d",
"0x94cDBF69ad672Ed4EAB377CdbFfb75C3893bEBFb",
"0x5F2eb619337d565B01D6032c0382089962F10a88",
"0xcD0452D4aE7920245aBf0712436b4c8aEF6FC5D3",
"0xa643b40bcef23d12d12979ee2f6e53be63ab9317",
"0x4c82F3E837C30D86d12Ba774FFC45431A348c350",
"0xB00826a8B73fCCEAdEe519FcA4A9ae342c405B27",
"0x42D372b3CeBb305B5B32Df5B5Cd6eE7A0681503b",
"0xB97d49f76b6eeBe653cA1eC16bCe9EBc0B13F65f",
"0x78cC3cd3D577d0E389314dCCF93bFE3097A8969f",
"0x6B66C515A09deb80A45d06B79aE07c949FB743Fe",
"0xC321961A52Df6cd77815d73206bF315086c8F877",
"0x52f65039a76BE79B31E9a631Df6fBEDE5D51603C",
"0x4a841c19b7698276547f7a6fa170986d3c69af68",
"0xB00826a8B73fCCEAdEe519FcA4A9ae342c405B27",
"0x42D372b3CeBb305B5B32Df5B5Cd6eE7A0681503b",
"0xB97d49f76b6eeBe653cA1eC16bCe9EBc0B13F65f",
"0x78cC3cd3D577d0E389314dCCF93bFE3097A8969f",
"0x6B66C515A09deb80A45d06B79aE07c949FB743Fe",
"0xC321961A52Df6cd77815d73206bF315086c8F877",
"0x52f65039a76BE79B31E9a631Df6fBEDE5D51603C",
"0x25BB190Da7F60E00bf26587cd12F0B3448B6d5d7",
"0xFd5a89ca88e1Ba880f16Ecdcd3211D3bA1776A8f",
"0xC630d90daE0dCf54a458f48A4c7D91edd05B9778",
"0xB57e20c15c19D172aF38211170c1F7181A49A3B4",
"0xd37C6a56A30bA62cD133268FD48fB2bB4B8D6b46",
"0xf8bda03f357e568b501fdf25813b4dcd9b9fe4de",
"0x85ee71c0aa47eb9de2904da74a910deaec42f0a0",
"0xc69472a6113867d45057e8d12df5f87384ee4b29",
"0x82B660Ef057287EFbdF82859340909965Bfc681A",
"0x42905d26a1A5491E9d350dCB1e68DCBBF45eB0FD",
"0x849Fa18589177bbbd194F146A93Fd81c479De4f1",
"0x2A54830BAb4447d601BB93CbC6b435107273A99f",
"0x4d4e9389b3b15919b8ba5086e2a8dcad830fedc7",
"0xeb6a8d19ad751d765c0c8af165f754f633899b6d",
"0x09bf972d2f0fce8caf639930f852c70439de72c6",
"0xec4aa1e7547dad784892df786f82399f855b7329",
"0x1a1e5D6E1f284C3590399Ef604d58cd0714A4fE7",
"0xf35048be8F5D5d47546Ec2b787F660eC1FFC48AC",
"0xb81c1af47C5fdE495628f147Ff7B214A17077637",
"0x8D05ad3BaD0d8319396C6C6687FCfbf0079A9c14",
"0x5854b96b212d489abcdedefccda458485c9753ee",
"0x8440Dec19C345EAd10d3069f2E0C133Bb49e26a3",
"0x95Ef50b9a7E4F62ebD562ed7581953DD83D05629",
"0xC7f99a56A492D69a5F53E02436280C9A2B503E24",
"0x892d12fd4d4930c8bc5e7b3d65f813d7bf8b5e46",
"0xe9e35dB7F160CD0ECe9AD9707deae3029B15E5C9",
"0x356171d4b9c22B16EBBF853881B651AF265aF748",
"0x45948a6c0e430be9780231cf87640d26db77f504",
"0xD440714d0D6ae69d56618f9E7A239AA17b3Be1F2",
"0x8F072Ac9d80Af523672d93CfcB7350f51F00b4bD",
"0xe97a6648bc52ed5e9945f7805f01a07267e83575",
"0xfe72fd9bEb41D71469A1046196cDde95Db515d3d",
"0x901b137cC7aB08B9CB1B4ce616D2A052102cA230"
]

export default function NFTEligibilityChecker() {
  const [address, setAddress] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false)

  const checkEligibility = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChecking(true)
    setStatus(null)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    const isEligible = ELIGIBLE_ADDRESSES.includes(address.toLowerCase())
    setStatus(isEligible ? 'Congratulations! You are in Wizlist!' : 'Sorry, you are not in Wizlist.')
    setIsChecking(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-900 to-black" 
         style={{
           backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pixil-gif-drawing%20(60)-fKNXXT6H1cRAHo9c1PCFkwJCuoeG9T.gif')",
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat',
           backgroundAttachment: 'fixed',
           backgroundBlendMode: 'overlay'
         }}>
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" bg-opacity-70 p-8 rounded-lg w-full max-w-md backdrop-blur-sm "
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 to-pink-100">
          Wizlist Checker
        </h1>
        <form onSubmit={checkEligibility} className="space-y-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Enter your based address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base  transition-colors duration-300"
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-black hover:from-black-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
            disabled={isChecking}
          >
            {isChecking ? 'Checking...' : 'Check Eligibility'}
          </Button>
        </form>
        {status && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`mt-6 p-4 rounded-lg ${status.includes('Congratulations') ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}
          >
            {status.includes('Congratulations') ? (
              <CheckCircle className="w-6 h-6 mr-2 text-white" />
            ) : (
              <XCircle className="w-6 h-6 mr-2 text-white" />
            )}
            <p className="text-center text-base sm:text-lg font-semibold text-white">
              {status}
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}