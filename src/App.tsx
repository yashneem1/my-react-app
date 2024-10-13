import { useState } from 'react';
import { Input } from './components/ui/input'; // Adjust based on your structure
import { Button } from './components/ui/button';
import { motion } from "framer-motion";
import { Sparkles, CheckCircle, XCircle } from "lucide-react";
import { FaTwitter } from 'react-icons/fa'; // Use Twitter icon instead

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
"0xae4b6230e0864353a8d19af12d0a215aaa8a6d0b",
"0xfe72fd9beb41d71469a1046196cdde95db515d3d",
"0x901b137cc7ab08b9cb1b4ce616d2a052102ca230",
"0x8f7d98ad6b3a22fb480241f539939d4ca1d101f5",
"0x3ad0f57f006b5a060d4631df7a996d7a188d9452",
"0xa2a5c4bba02a936c2a4cea12f1e121e61a6cc278",
"0xfecd385fda02cd5403663898c3eddd037f90e14a",
"0xa2bb4bb00fa841b5691b8e39b30514b674102807",
"0xec64302e26fcfc16b194030959598f4461d7a9bb",
"0xc7683d4c82bf464def6757186f9b31427f6a01f7",
"0x2a3319e845e6932af47ce2c518b0adb331e4fbab",
"0x795867766d030a1ac6d48fdd8b4f8d9a325274e5",
"0x5d524a7d2e96f3182aeaa33adbd019e033b7e0b9",
"0xada123bffd809fda0ee73a4208858c9f97fe58bc",
"0xc9882d952703999c5cd6e22e9672cc3eeaa03b9c",
"0x60125f66727df5936a573c6352fc446869b09df6",
"0x10b338664d748b41fd65e647696f76802dc057f5",
"0xda8439ad7520a9168da0478f445a22e8694673a7",
"0x8ca04fde6c3822f4ae0a0d1615841f2895445678",
"0x30f9e0d7b0357f4a4efe3b1cfb802739de067244",
"0x6927a0d2a5e1ce3e5046a3d1d1b4dab7cbe7f41c",
"0x3264b37b64dd0c2fa3c3a2a43254041a698f1d6d",
"0xbe0e6cd4cbf9ad6bbe75df8384c36aed556e409c",
"0x271975e8a353e38cd032e1face0bfedbf059363c",
"0x184ba00be49d642f42e9d814a762d7b4ebdf50bf",
"0x15a325bbf3010c1ca850cf295b67ee43e993bb6d",
"0xc5b61ef438a4f5be95bc0eac19949fbafa14fe4f",
"0xd64d6b4b387e17fcfd21b0a63c22dc0a44619083",
"0xc229974ec5af6febaa10aa156e46d94cb7cd3257",
"0x035e49b6de86bb75382501f6206f7c90f45e2b08",
"0x87eaeaf4ccb6fe0c26ceedd1e4662d8fedc8fd86",
"0xdb75d14117e7802e0596baf2c92b90c0f0ab1aa5",
"0x0754e0b5898f76c9bc03a3646d3c9def19a2f04f",
"0xe1f0b85e99dfceebb493451792e7228f08964e17",
"0x6471e08598ee41bfd499fdc12336fd2c7443eb66",
"0xaba67b7faac905db5c5cda54b5901ce0ac2fb7e4",
"0x02f1e2947a99e299feb8da364e1ab89370ddbed3",
"0xb35a8a9c825e61eaed7564d9f7538bb802f08bc5",
"0xe6dd2e2ab8ef62464f755326ef8673fa69f3d1a3",
"0x140db20be7c5fc554df26a27ed73c4bbafcc85c5",
"0x926264e82e3d129d429969b39191d17d95787d12",
"0x5c3ce91d8a514f7bfa84cf71048ab8fc4144a759",
"0x6880c355c73e9538313c5203c7783cc56609f044",
"0xde71809abab5123aa17aa8999443d3df641b8dbd",
"0xd633aa4636bb8262995a94cb896d28e5d390bc9d",
"0x48350e84e99736041e009346cccbd390dfc4c1c1",
"0xdc8f09b81276cbacea5a9262774749f824756cb3",
"0x550df8bdee750e2991b251278b75cbee6775dada",
"0xeb3d6cb6afc1bcb1ef0fdb2a3d6e88f2ea6934b6",
"0xc9b4447bb487f6c71306345ab2ae21cc5571215b",
"0x2d5b038d40e483f4a6bef2f6ade962add385730a",
"0xc960517dee7a3fc8b1f28481fd82756023d3470d",
"0x6de8bdd19cd76b89ea2eb1ab6d9b245433652ef9",
"0x989d4876da6f646b605f9d8a659cdf65cb055fab",
"0xa41b73050c9caee703d55701dd3c637c54016943",
"0x51d713c53f144cce2a8c2b145963ab8bea7cd55c",
"0x4cc8f688eeffe8afad4831280a71470ba02ed8f1",
"0xaa62a90b997654e454b45e8cedd645c4ba365ea5",
"0xbc50200f92d25fd18e86d8510fd0540295427b35",
"0x632165d93915df14f891be0e27227fb3b1fe26b1",
"0x53631fffe06ab7c060430b78c6798adb20590b99",
"0xc8ddbf0ed5c19f0f40b8276f9905608775a1bd03",
"0xac8ebeb5f3a0187d49e85d304547609387512eb2",
"0x9c2c10f8eb8632e76c0573104ca3485c6146e11c",
"0x4b194e94b52278a036a8ceebed16c9a322928ff4",
"0x86e24189fff5cd034597e2afd3bed0858008e947",
"0x2545f7d67b7071380db8ceaaba6020611ef643e2",
"0xe7dddffc6e55c34199b2f79630e6a8d433c74260",
"0x9c26a52f3f1ae3bdafa55fe1f4271eb38e84ddb2",
"0xc111d69dd4fbf358f3ec90652f773d1af38bc678",
"0xe7950ca9c4f95a3bf2716cce62b84290f7767b12",
"0xbc685d67a07f4e780660903797df53ed01084419",
"0x8e1f7a6315ab27b351055823a30168524b8c0f31",
"0xb34bc74c055e4774e98bcce0b4787a1aa8d562ac",
"0x5ed023a48c63ce43fb4f0046cf603a80158fd460",
"0x3702064c59a6c5f74e1097e096c4d49b646ded2e",
"0x72fb298349273b04a4d0a32d86364eceac59008f",
"0x0d373c746d4943a724941ff2c6b27e65c66fbd6f",
"0x59f0e33586e24d3b6fea8a88741eaa1840dff7e5",
"0x1897a69c3b2a9ea1b5363bc8dbc51237a25d401d",
"0xd106d7860ec229da09e8c2f40f27ab132b55706c",
"0xfaab0e2ad68ef79425d5cfab0da0d922747fd2e6",
"0x0ec55a37d43bbe3b0373db85ae10570372c99132",
"0xb7b9b0923c9701cecf1cfe9fdcaf983acfca8a8f",
"0x4807c7bfac27692f2ac85e4d3285bd149729f4e2",
"0x47a3474d39451fb1348f732345a476cdcaebc093",
"0x69902c262ac8ed09a1d2bf514024378a310b8cc8",
"0x2cc1909c837d7ecf4d3e0880723751776ffdcc4d",
"0x863be25f86ed9b3e9ac32fbf1df3022b4fb70bf9",
"0x1cb827446bc108db9bf6e01fd44fcba5b2b5e5a9",
"0xc29a3555180ec6ba86580bbb56510268b0e6c0d9",
"0x1e5dface4ac971d042dfbdba2856354a700b83f6",
"0xd57e1aacd744e231868cec97fa038f7f65c915ef",
"0x383d07506ca4a7121547bd056e78e2422fcf7c11",
"0x507d35c3471cd1b3b30eadff4d1f38b701b98013",
"0x61b4a0bdabe012015890fd9f161265066697fedb",
"0x08b6998a2e283849a6b836b16102dae528cac9d4",
"0x6475c3d676163526e79b8c55c29425b79fbff11e",
"0xe582424280922d54602286720ae62066be013dee",
"0xf4340ff79c0b42c813b4d6ea14b4d5bc86355684",
"0x0a9173154c1d2f9f840f0eebc8d42165cbbe2a6a",
"0x7aaef447c7e724ab17cad5d626a7721289ba5cc3",
"0x399297a6cb446550a0353c55f842b83929d6dc9c",
"0x8c4bcfe94cd9219a39ea92743050af4828a1381f",
"0x7cb0dcd21744f35b2a662e7ce9aa626f567372bd",
"0x6145186d5afe79a30b09f181be7f1ea4abaaf83a",
"0xbd8bf83c36563638fb6dc4fb52e5640ca06f0f27",
"0x6d6a187479800ced04cf30977b0d57fce6fb9a0a",
"0x3e07b24cb818a8648243efed593d0cad5a2331dd",
"0x6ad90097e011bc849b785aadc44c7a659656a77d",
"0x4b8e4a0627cad99a9ff2d1bf2b188ec6830f51d1",
"0x0085d21f0165bd0cf8342699a42d1d04cefab3fa",
"0x0b225a8333bd5778d0ab2464212811a178a7043a",
"0xd00490946bd43d64263e03ce0f4c382efd4e794b",
"0x5a351e86bb9885632dd21a3cf3681af0c0b103bb",
"0xebfbfa8e7ef5d5864ef60e343a5fa109d643076d",
"0xba35b30dd0b56ee28a23994db24e6efc96d1bf55",
"0x5f8c446d3a7150740a99041ea2feb7ce49fdc5cf",
"0xf5213cc7411da9fff3058a55e6ca83cc254ca066",
"0xa00e4ba46907fcbf84b3ba22c7b5689e6db827a0",
"0x41d3ea0d6a64d603cb8c3ff710f05f546061cdde",
"0xfa4cf56a970974748914b92c05505fd18e4d8e15",
"0xfbf8ae69b25542ac6833e2de631e7b082ffab1f5",
"0x211fef38f0c51b28ef8b280d1bc358e8ae5a409d",
"0xb8410f47e152e6ec0e7578f8e0d79d10fb90e09b",
"0x6deb9c719f76d7c398f42ff2f2f6203d7c39da5a",
"0x930ca80ec91fd85e324a0ffaf31872b97679cf36",
"0x381e0aa5965dd44ca0920577506bd1cc5677badb",
"0xfd232b7b6924454fdcd275076e6b9beb4f9150eb",
"0x41fd0ec0bc2a1b92daf076889f1884aa1fba146b",
"0x9fe66ea7d92d306b9abee1801423a6ffbfc549f5",
"0x52486d953d1921f6236300ec75aef6f72962a49f",
"0xa2d2307bef7e48d92776570a966298af093b5740",
"0xd881f664a7c53a5f4744f6fc189fe538c9b3e7c3",
"0xe3f530861065f621ff547ff3450ab5351031c7fa",
"0x3116f4c768695be3fa5fa3cc3f0aad81a89f3aec",
"0xe49abba13d1a7129c96a28cd437a3b9b151120d0",
"0xcd6e5da9a0c8ee022bf749ac4743f6f2fac0c35f",
"0xbafe25c6ac45eb5342aad85c920b6c40bc943bcb",
"0xdefa52ed967433c5ecf0bb122a508d4376d44bda",
"0x08ef8530b61405216dca143a3de7dd44647cd9b6",
"0xb5604945e37454e5ab3b343080fccba4da6d8052",
"0x6056c507f31686e09889c0ea4d9ee70972249e51",
"0xb345949d3dfbf3f6c7e866e43fb37d91c25e4ec7",
"0x5bea240d3df66833c04d66cb65e23f3c00a3b802",
"0xe40a00ddf76c72593327b4b93718db4ba43b6a2b",
"0x8725b1ff8598746c977e2d958ded32ce7e43a2dc",
"0xd154879282d1ba8107c4d5caf31d78c77cb7de3e",
"0x674ad5c8fef54f9a0d7a131f6b65411276ba367c",
"0x5686598390c45144ab3bc02e05158e17d0af8864",
"0x28830d2d49f081d4a6d54991daf14df70ac33204",
"0xf3c63885887c5d0605334e6cf0c68165e9cd8c39",
"0x5e5a5851b53690f45c2fd317d4f90718d0561f3d",
"0xdad6708957d14f4b1a50fe2286b6743c3ad4d015",
"0xf5da4caae88fc109f4539ad8d7d768941baa5635",
"0x0905fc50b119584a868cc4ed86504cf842c63bbd",
"0xa8864f22d4f3dfc1ec7d7012bbaa1de2b255d8f4",
"0x3416cfe4615d489289f40c29a9372162c75be513",
"0x37704ae2ad6945334882037da9a1b60fc44d24d7",
"0x758cfd38752083dac06b19f367029e5bf7897502",
"0x0085529550f143f8168ff1b8f9c6549355686f96",
"0x8f8d76b291ccda7659a8b95c359ef4d05fadb25b",
"0x7ea8f81ba630bae9db4b5f67e253252c2bd5fb1c",
"0xcc8f17ad6559f531b289729cc313f902058e4d78",
"0xbed66d7cbc7082be8f8310d69a68bbaa9346d384",
"0x80057f68bf26f53e15d03cf8bc63a6e31a0ae761",
"0x11b4961ea4a60f548ecf694e7e35ee7e9309f0f5",
"0x4f7041e0264ebb6b51ea22e66de7ddebdacdcf08",
"0xec9eadab792fd706a68dd3e21a1c8c7b1527e44a",
"0xdf298ab0778296aa892c98811d2cfab59e846292",
"0x9a360644b16edaa11bd2e0da4c920910e27bd7a2",
"0xdd62b65c93e1f7b4cf9a420110d77508fe07a596",
"0xa395db6f10f2855af4c9858315d68e82d1aa9468",
"0xd20f2faa4829fa60e2cdff3bfe586aa962a01e31",
"0xcda5c8cb192f22ef9b06ac1aa4aedd4d481dc511",
"0x4cd15f3755ece14aac2843519e56369178851dfb",
"0xeefbbf78ce1aef3aba2f79b6a290d326f1b45280",
"0x3cd49b429bbde7bbf02e0ff87deac22f1d7b10d9",
"0x24caaa2a4299648416c7bf8eeba92fdb208c30c0",
"0x2b97d36d7408f587cd72dc5a5fdba4a19bcce129",
"0xda38b41346d9d999cd589bf488edaf05b2898478",
"0x78aa39849c1280cfcadd65c585acae297789084a",
"0x5480a1e242d7f38d2ba23844b87d4d13a9b628e4",
"0x101a998b27b0843073b7ba6e63d77b724fa18ffa",
"0x65b78e0b2f48e027299c86c891c02b661188cfa8",
"0x23d15b45a589d189c41c448a5d00e24f24add1d6",
"0x2b852db04cee866b47ddd105f86e66210ea8bd17",
"0x50864075ebb0bf515823826c14a742cf3ffaa43b",
"0x483b0b488cf75848cfb63a97f16064dc79f82c9c",
"0xe111eebfb53b29db375c19c9c2c163c3db1a4b5a",
"0x6a2459a631a74876c9cef41fd629d3e0b04f9245",
"0x9fe7622da2cb4d53195a1bcc0052c856e260736e",
"0x29de72bd283d052d0bcdd25584d5c78fa56550c3",
"0x4934e8a138206fd22c4c9d1700835e3ee9df6a51",
"0x84dd10598f69e450167595ec3f1401184c83f42e",
"0x54af902f7bf5cf9a59d332f07c68d19e2436b0cf",
"0x3d68896578f88fe0b9dbb9317ca7f065b3fd36eb",
"0x6af848f842dd70604d44b0270f5f870bf108e7d0",
"0x233ec558d7201e0fd60ac93d8dbfaca28117acf4",
"0xdf0783ae4bbc2934be748f055642c6355db23419",
"0xf0a7599d1b7c10961f03938e81c1f53d6567a24b",
"0xb03c014486feb6cc8b0a5a77b60e1ca336b4a9e3",
"0xbdda83eeeda857439d182e6c7dc4b430abf04245",
"0x94b827148c6b8f364d34311d9c197a497d655af6",
"0x044550a7a8ed754eaa6bcdbaaeff81fd44c761f9",
"0xa626660a955a5fc7b3f7e1ea2527822cd1c1eb3e",
"0x76571bdaafcd9c6dcb747d9f1f7b7038d2083bb0",
"0xeda7360430422e131364825d4911b1b753bcaa3d",
"0xe7d5233b655bd23615d6e7983680d27f92fa887d",
"0xa6f60f8063df779efbe6b85abd42cea993da4c8c",
"0x6669a29ca1dea5d97fec32de5186e4300d3ac24d",
"0xf01fdecadaa7553150f913f2de6a6f2aafd9da29",
"0x49be3e9ca77f62b6a7534c10b130e58f89309c39",
"0x5f026b6b999854645548a9b9fd2f0fc65128cef8",
"0x1a997db3206d7d7b0cb20e9b07d07e9566de73ca",
"0xf8ec848c7990071f1d9b8e82d253420f5253a63f",
"0xf8bbab785d8b11bba7cbf82f4919fcecc4e97154",
"0x2625b4da309819cb8b5eb8aee13c86ad0e097ef6",
"0x1229bac2d546970d11eab40c8d9d50d6b8163b0d",
"0x74eab9a851279be57fc957c1a50d6ea8c5b195ce",
"0x547948798edc6d0bd133931c4c627170ef48b79d",
"0x9feab592866f530a5f6f7a3778a4f0cb3ed9723e",
"0xd44f43fd77ea9bdcca42ff01b2e4efc25a3824a7",
"0x1735440e2d84408a5d6592f4f0096e170ec9b5ad",
"0x23341d41a16e00b0a0368fc6bf56f5468c3354f1",
"0xe7345a67dc62e2fb5532273d4dfcbb98e0f83937",
"0xe865d5b32be69f6c7015f082a009731d30b9938d",
"0xd8a20762bd37f5719cab0ce46b7d06c54d5d3f44",
"0xb5fa255bc7aa30dbd4500bad46c9733041fd834f",
"0x368a0cf413904eb339025eb99cc7a7cd884c5fd9",
"0x0ad63c288799a4d5fbbfe0c9e89e71b274303606",
"0x77b966275bfc8ebb9ad2ac08e5f19eba4dd8c3e3",
"0x79d8b7fa6049d3c1f18e82fafe0eeef198ab3f1b",
"0x34373dd1968e8222eaf1ce0abc4b89027767296a",
"0x79fdacf3c8831433601f268acab20cfc97220268",
"0xad5acb03ca422fe1f6277d331f34003dbb8155d7",
"0xf71a264c37465329ea54c67141feb84bc2843307",
"0x8b427c3b2edd0a281b099563189fe2a1040697a3",
"0xb88bad0a051a3d8049cdddfc53b974b9c2c77800",
"0x2e909bf45d3242d3a4faf24c79df00f9b4e87f8f",
"0x2fa6273ec19644443d008be8f0d0ed4e0e4143b2",
"0xf23463d2d3dc16feaf25057c63101caf3bc74100",
"0x6a1d6fbb398a6d5afbd97885f9b7287e18b42950",
"0x158ae2ccd731059bab553d2c984dbebd836fdd10",
"0x8da676960bc0d68fe0bbae822e6c0211582c4fe5",
"0x7ddb209f5b10566d10ea9db5c4a17fabdf5288ac",
"0x25f76704987b90b3ec9b6259980a8e25b0be625a",
"0x10f69c571f567bf24a82a6d2cacd748beb2e669f",
"0x26452fff1c788261b0ff9cb66b4eb550dfb0edda",
"0x705fdcb1520e7247ab40dabf45a7333e6551f6c7",
"0x881dd199f9f14b03d71e9a548e163924f31da205",
"0x45069779d8fd0e29d95ece8829ece15465b41a00",
"0xb64482ff80394a73bfc4e08e80d560f19fd83a31",
"0x7dca6b5093967aae22b7ad434af4df1b8a0bf655",
"0x529fcbfd9d0f9bd6a4eeeac07347e13d91b36303",
"0x0cd0cfacaef9e31cb04ad49685f371c53d0b9cb3",
"0xf4c4f28786d5bf691e0cd3dbca0f1e05b584bf00",
"0x9fe6f3f93d8c6bee47eb0c5b516f36925126b553",
"0xdf9c21573e539c50c54250209159a977c2f35d7b",
"0xcc054a09aeb764ea61de44bbca2d4926d0823dcd",
"0x088e7870d6681d340db6c21dcbda7534ea92a449",
"0xab18a4368df6b09236839ce10af1f86181dd58c7",
"0xda072cd08c44155c315aefcb0f2ed310017ac8f0",
"0xe44454056ee96999b01d6f1b52638f62c2f6e9ac",
"0x009aa27fcd907941adeb78ccf9edf9f98dd78904",
"0x1935cc900625c6f077a7489fe2c9de0e6dc815dc",
"0x7b67ea1e2b36f7839e8832af2697f7b8b37a5458",
"0xa107040f03ad52cecee4a644e5ec92cb9573b605",
"0x4654ecaf271fde81a6dc072e62f32adcbef687da",
"0x21948286d5ef91d21da1235c7c2c1e2910458083",
"0xf4e5bc2b5c2c32d5fb75b193683c255a818c70b5",
"0x06fe315ec00bffd7875686deed245aa1e26ec050",
"0x33a46841a13112e7579cd2861c77aae215804b4c",
"0x7a137b6ae39c39676a84616862382dce70418293",
"0x428f34b08780c47dcb183a32548744ff22f1398f",
"0x82cc75417d1ca89bfd4f82f56aaba82289643779",
"0x073c2fb1e3357f202ade94a461d2f0937172d574",
"0xff8b365b0cc0a3fd092d6b37265adac7af83113d",
"0x4a0eb3ecd5f6ef54bf0fe0d273e059804172b900",
"0xc686a6281d5c166f5834ced004411b4143a1f1a5",
"0x9c35f335d3c2b17022ca2436eb7007560aef51c4",
"0x072510979b59e9bc675d4fa923a1b5bd9376962c",
"0x5ded68544ac7bafc906b8260f8360676fe759f73",
"0xf38c7b0e9454d07492e878cd280ce23fe4197274",
"0x5a0ffef5fc0974d5b857bbe79b192c8661a7827f",
"0xb4442fad4011bd936cc4371ab84d26fc54d9a9a1",
"0x6b394ad90e78390d99cf3689dedcbd9e9beef062",
"0x3d324fb82169346622223665e2b63a1c27b58800",
"0x6b5b1a8521a9a352b019221f4ef94122b145fa74",
"0x9f3a5dd191354af43cc56d48ec1d6a1a6bff009b",
"0x9ab72348b036a3dd726bbd40409b8e5abd3b0263",
"0x1858378fb646ecbfb63241f2bdbb1acf36e14885",
"0x96595a4b5d4b695760eab770596179c4117f2a13",
"0x49188dc8e02837b84dfad8d57079fb972bb556b8",
"0xf28a34675734dab1026e43af5d5e176e99776087",
"0x0ecdf59596b285d769fd473a57b3ffbc9606ea15",
"0x216f591bdcc1c75e73b43ae8cb3a49668eda6675",
"0x76eb44f4508abd219fb883ced86614bf961840be",
"0xaf7b0b7d438ed0da07861cc254ca8d9daa77c04e",
"0xb53c12a03e610666afac51985706f723c53c8a7f",
"0xed4281048a71887c9acded2041dde74b051cc631",
"0xae2f545f2b0d3d3a5e1cc288a21ce23feb3ef63f",
"0xf70c7035af09612aac0229e4166154acec9dbc8f",
"0x726060a637701e3fd59041697efc23e70b806f75",
"0x96f0eb7fdad25f29b270510dd06a5b9096f84929",
"0xb258756fba319ab269eb786e4947ec7e0dcb0c1b",
"0x392d509994d9665169cea0c7a06a3e5affbdf4bb",
"0x76dfc70346a9c2588c3f690e416d90f0351dc085",
"0xd349501404e882502c6417190c41631c77700ce4",
"0xf4e0138916f22c67595bfcbcf6bb00ee8eebe5fa",
"0xbf9a0f78909eba88972e6dd09850e1c6a9931164",
"0x2087a810ee7a6fcf5842fb8d627a0685f037525a",
"0xc2fba94ce87e66b0b0c33195496b0c122f31dd85"
];

export default function NFTEligibilityChecker() {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  const checkEligibility = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsChecking(true);
    setStatus(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    const isEligible = ELIGIBLE_ADDRESSES.includes(address.toLowerCase());
    setStatus(isEligible ? 'Congratulations! You are in Wizlist!' : 'Sorry, you are not in Wizlist.');
    setIsChecking(false);
  };

  const tweetMessage = "I am eligible for Based Wizard WL Mint! Check yours too! #BasedWizard www.basedwizard.xyz"; 

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
        className="bg-opacity-70 p-8 rounded-lg w-full max-w-md backdrop-blur-sm"
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
              className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base transition-colors duration-300"
            />
            <Sparkles className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500" />
          </div>
          <Button 
            type="submit" 
            className="w-full bg-black hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105"
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
            className={`mt-6 p-4 rounded-lg ${status.includes('Congratulations') ? 'bg-green-500' : 'bg-red-500'} flex flex-col items-center`}
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
        {status && status.includes('Congratulations') && (
          <a 
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetMessage)}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mt-4 flex items-center justify-center p-2 bg-black hover:bg-gray-700 text-white rounded transition-colors duration-300"
          >
            <FaTwitter className="mr-2" /> Post on X
          </a>
        )}
      </motion.div>
    </div>
  );
}
