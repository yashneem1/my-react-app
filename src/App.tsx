import { useState } from 'react'
//import { Input } from "@/components/ui/input"
import {Input} from './components/ui/input'; // Adjust based on your structure

//import { Button } from "@/components/ui/button"
import {Button} from './components/ui/button';

import { motion } from "framer-motion"
import { Sparkles, CheckCircle, XCircle } from "lucide-react"

// Hardcoded list of eligible addresses
const ELIGIBLE_ADDRESSES = [
"0xa044e8a1535b51ceaad88da7d7bf1296210d5975",
"0xb07ad6655cb6427eab7475b77eb0b73fca540199",
"0x8338add602bc084bfa24724f15f9f9d1ee3ce721",
"0x29900546817e26373380ac9e5f988cc4811bb014",
"0x5e703f2aed804022e959aeba7f23c1f22e66715f ",
"0xc10097364902857e9d94e1db263d84d1e706f322",
"0x51314712856f8fb4a00c9a663b2adf8ade203a19",
"0x98c60eac126499a0ba2d748c6293f22f0c62f0fa",
"0x06d7908eb0508dc583a8c29961173ab6269deaa5",
"0xf5b6f869d96164c323c12b7ba8739b2fb20e8edc",
"0x4ab0324747df2e5564b7b3e6940eb48e6837add9",
"0xc5660dd00ae021915dc7b911cdc2b9944a2456ea",
"0xf7b861fba42096fe5cf194286e9a4786230a1e9f",
"0x1ee4307785d853ca1ff7e56fe7e1aea808ff14a0",
"0x15b39a24daf40043f66ce8d0f6667a0968dac7b3",
"0x7bee10a601d3473c524e4e5e94f1de2911f1be12",
"0xa4ab04929449e808fdde215144926c7e04b534ba",
"0x90e22c430509705b9678eb1b7457223c4b879a2b",
"0x52eff600e9a0317981c1e3ee882c4b6d6e053f5d",
"0x4e954cbffb39abbb173e4ad1307b0c776595ee12",
"0x91b02cb2336c7b78155db381bdcd2506cdaab8d8",
"0xbdb969a121d3bd526d90996d426e815c1e88652b",
"0x34379e29ae02055cb9558db402f0762a786cbb44",
"0x5a980e78b14338fa4b72e560498ceb3dacde5c98",
"0xeea857f4413af5b7ede6e0593121a56135fe3963",
"0x57fb5c30560289995d1eeff89df4f621525f6b99",
"0x545c810fddd7620a0be9fb51f03c2f91f4db8a95",
"0x92d39f00171d25104d626b3bdcde8509e413027d",
"0xc1fdbdbd3438c86e5a5a985426f94da1a02f706e",
"0xb4e8be270e2565fa9590dddde2e203eb203e0ef3",
"0x2a195071645748dd57459403ec94f99b432845f3",
"0xc6831fb7a653ded0b85693947995896b89ed8e00",
"0x7ba290c6146f4dedf7d0dbb6b3f75d4e1b39fe92",
"0x30f682b2b7a0e8c72714c0ca4ad28b40ccef3fdf",
"0xb2b0c35500db766675335a10c2ea7adfb63c0b67",
"0x15e55917d7083f2d459a5881fc8a3be0b99a03c1",
"0x7a8c4e86d7992f88843fb4576bbefa158464663a",
"0x3b1df14f4cd4824a9485c1960f1c99e711a45925",
"0xd5a58885ed969bd968401d2f9cbb4affb4816722",
"0xf5ec5ca3f66dc90b4a96e958f9068caed134c3d1",
"0xdc0a17067af73e5035087872e6a95b0b248fb23d",
"0x64882c718e047be3599ff701db201202c1f73ae4",
"0x0c07a8cbc6dc88637f9781ff63d557e3d953e3bc",
"0x74f30e9992a555b9d54698ab6df3e3f589632c16",
"0x1339e0a42957eed7d063a574b122e9e0bd691cce",
"0x634086ecee3de7d4cde8dfef8784ab209b5a45db",
"0x08a31afe33aa3c73f8871363d153ebf1ec8042a3",
"0x99d3eb4547dd4bf3d1c4eed4115dd7b087dba440",
"0xfeebe5cba0d16aceb8ccf60d5a896f4da2141113",
"0x9029f1a23f07ab79590cf63a85540493dda46963",
"0xaf73a2922d0624f797abc01e256ccd226a50791f",
"0xaf949a4d41e168f738f5ae5975458b8228c46ae4",
"0x93b47f1ddc0cda867eea730cb32d9384808a99e1",
"0x035a5a55134a9fa69e7032b109c4e477540c2de8",
"0xd4d8465fe9cef8dd0995fbbee87b61811416c506",
"0xfedb8e5cc87cd5e63f6abbab898e24568be25a90",
"0xe2aa0cba08ce4899eaca3a80dc4eba694603a31a",
"0x0e6e00de5c4c913825cafac2f8f7b183fcc1a531",
"0x6b2447183111ac2e2556e8aaa10ace91247d5679",
"0xb6de4e0c9054ef4242c8e8e09b5a0f53fa0853c0",
"0x9b7103844b0c7c8bff5e41599ba0382d34515eb9",
"0x4fc890e6673a33f52180e2b6a5156fe4e52fa3ce",
"0x680a438e63d1be66b14d5fe395f4600da37d4ac1",
"0xc67b53c5a4d79d300cd48ee180b2bdec477082bc",
"0x96109c6149b251af4fee4607da8989639c4a7de3",
"0xfc4f7fc01cc2128a5eb199a3e192935862f53172",
"0x9ef6607eca2dcc9dd45c032f6241feaa82693db7",
"0x7341650db6c94593c47bec64d4ff2f9519d54e83",
"0xcdfe654bce2e5d735f0ab0bffc2f6fc02fcca22b",
"0xd4ef9a2d9c367eab8aa29700967584844a5556d0",
"0x54c628a6990f0b2f3046a3ceace6eab1e2cbe04b",
"0x4f0d809e1bd60317b26933df1367aa8382a7b724",
"0x3abbb4a6d84def8e189573bbdd6fb2bb96836829",
"0xf98130e2739c8e150aa4de8a22ad000363adf26c",
"0x7f8f5da84114f09b0777035d7fd5642fad07c1f3",
"0x5b245afaa7b4cbbb464e50c253c6c72d5948a79e",
"0x96eac0befe9e654acdb8a6973432d2ece2d26c31",
"0xef06656a58af855a509711cd09ddf75cfcbccac8",
"0xa0004205f2c8e88a002340d496f1ec72958fa5cf",
"0x74b4cd6e8a47142faf28f082767eaccb3d14691f",
"0x4bd550c85b61d0a059042bdfffe4c56c07d3a400",
"0x24867f3586148a9ca8a354b7fbd32254f2776ac5",
"0x7edfbd2d04505e74ea6ff6c1720275a9b16a3869",
"0xcd0e69d34fb7bb7af50cdec4b6881cb40985ebea",
"0xced74c23d35c4c5d9efe946c21cb2cc0127b386f",
"0x09287a4cff1b22803cc5adee5ea5b8e295ef316e",
"0x8440dec19c345ead10d3069f2e0c133bb49e26a3 ",
"0xf3ebef48227a8ccb7fa376096a97448fbef41fbe",
"0x45948a6c0e430be9780231cf87640d26db77f504",
"0xd440714d0d6ae69d56618f9e7a239aa17b3be1f2",
"0x8f072ac9d80af523672d93cfcb7350f51f00b4bd",
"0xe97a6648bc52ed5e9945f7805f01a07267e83575",
"0x652735c14cc4793091b80a28a1f0513cdd31e15e",
"0xd781bb234b7790467c742e8d158d5c8a93a9aeea",
"0x47c7d24f097bf6e93701b46c53c06a2e97d8616d",
"0xe9492008573363d2b3f47b194ccc39ee8799afdc",
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
"0xeedcc4d7d9ea1c9c1d1944717a1dfc73663d7d45",
"0x50942699871757916cfd5349c1c593cf25791e85",
"0x02c176cd7d7d4c277dbe0fbfb18ff63b7e5e8c9d",
"0x2727975e8c02360b36c85b127ea5cf45291e183d",
"0x94cdbf69ad672ed4eab377cdbffb75c3893bebfb",
"0x5f2eb619337d565b01d6032c0382089962f10a88",
"0xcd0452d4ae7920245abf0712436b4c8aef6fc5d3",
"0xa643b40bcef23d12d12979ee2f6e53be63ab9317",
"0x4c82f3e837c30d86d12ba774ffc45431a348c350",
"0xb00826a8b73fcceadee519fca4a9ae342c405b27",
"0x42d372b3cebb305b5b32df5b5cd6ee7a0681503b",
"0xb97d49f76b6eebe653ca1ec16bce9ebc0b13f65f",
"0x78cc3cd3d577d0e389314dccf93bfe3097a8969f",
"0x6b66c515a09deb80a45d06b79ae07c949fb743fe",
"0xc321961a52df6cd77815d73206bf315086c8f877",
"0x52f65039a76be79b31e9a631df6fbede5d51603c",
"0x4a841c19b7698276547f7a6fa170986d3c69af68",
"0xb00826a8b73fcceadee519fca4a9ae342c405b27",
"0x42d372b3cebb305b5b32df5b5cd6ee7a0681503b",
"0xb97d49f76b6eebe653ca1ec16bce9ebc0b13f65f",
"0x78cc3cd3d577d0e389314dccf93bfe3097a8969f",
"0x6b66c515a09deb80a45d06b79ae07c949fb743fe",
"0xc321961a52df6cd77815d73206bf315086c8f877",
"0x52f65039a76be79b31e9a631df6fbede5d51603c",
"0x25bb190da7f60e00bf26587cd12f0b3448b6d5d7",
"0xfd5a89ca88e1ba880f16ecdcd3211d3ba1776a8f",
"0xc630d90dae0dcf54a458f48a4c7d91edd05b9778",
"0xb57e20c15c19d172af38211170c1f7181a49a3b4",
"0xd37c6a56a30ba62cd133268fd48fb2bb4b8d6b46",
"0xf8bda03f357e568b501fdf25813b4dcd9b9fe4de",
"0x85ee71c0aa47eb9de2904da74a910deaec42f0a0",
"0xc69472a6113867d45057e8d12df5f87384ee4b29",
"0x82b660ef057287efbdf82859340909965bfc681a",
"0x42905d26a1a5491e9d350dcb1e68dcbbf45eb0fd",
"0x849fa18589177bbbd194f146a93fd81c479de4f1",
"0x2a54830bab4447d601bb93cbc6b435107273a99f",
"0x4d4e9389b3b15919b8ba5086e2a8dcad830fedc7",
"0xeb6a8d19ad751d765c0c8af165f754f633899b6d",
"0x09bf972d2f0fce8caf639930f852c70439de72c6",
"0xec4aa1e7547dad784892df786f82399f855b7329",
"0x1a1e5d6e1f284c3590399ef604d58cd0714a4fe7",
"0xf35048be8f5d5d47546ec2b787f660ec1ffc48ac",
"0xb81c1af47c5fde495628f147ff7b214a17077637",
"0x8d05ad3bad0d8319396c6c6687fcfbf0079a9c14",
"0x5854b96b212d489abcdedefccda458485c9753ee",
"0x8440dec19c345ead10d3069f2e0c133bb49e26a3",
"0x95ef50b9a7e4f62ebd562ed7581953dd83d05629",
"0xc7f99a56a492d69a5f53e02436280c9a2b503e24",
"0x892d12fd4d4930c8bc5e7b3d65f813d7bf8b5e46",
"0xe9e35db7f160cd0ece9ad9707deae3029b15e5c9",
"0x356171d4b9c22b16ebbf853881b651af265af748",
"0x45948a6c0e430be9780231cf87640d26db77f504",
"0xd440714d0d6ae69d56618f9e7a239aa17b3be1f2",
"0x8f072ac9d80af523672d93cfcb7350f51f00b4bd",
"0xe97a6648bc52ed5e9945f7805f01a07267e83575",
"0xfe72fd9beb41d71469a1046196cdde95db515d3d",
"0x901b137cc7ab08b9cb1b4ce616d2a052102ca230"
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