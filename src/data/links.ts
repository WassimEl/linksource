export interface Link {
  name: string;
  url: string;
  description?: string;
  tags?: string[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  links: Link[];
}

export const categories: Category[] = [
  {
    id: "gaming",
    label: "Gaming",
    icon: "🎮",
    links: [
      { name: "ValveArchive", url: "https://valvearchive.com/", description: "Valve game archive", tags: ["archive", "valve", "history"] },
      { name: "LetsPlayIndex", url: "https://www.letsplayindex.com/", description: "Game index", tags: ["index", "discovery"] },
      { name: "The Data Dungeon Archive", url: "https://archive.thedatadungeon.com/", description: "Data archive", tags: ["archive", "data"] },
      { name: "Spriters Resource", url: "https://www.spriters-resource.com/", description: "Game sprites", tags: ["sprites", "art", "assets"] },
      { name: "Spriters Resource (Models)", url: "https://models.spriters-resource.com/", description: "3D game models", tags: ["3d", "models", "assets"] },
      { name: "Mii Characters", url: "https://www.miicharacters.com/", description: "Mii character designs", tags: ["mii", "nintendo", "characters"] },
      { name: "Buzzin.live", url: "https://buzzin.live/", description: "Live quiz games", tags: ["quiz", "multiplayer", "live"] },
      { name: "Challonge", url: "https://challonge.com/fr", description: "Tournament brackets", tags: ["tournament", "esport", "bracket"] },
      { name: "Nodal.gg", url: "https://nodal.gg/", description: "Gaming platform", tags: ["platform", "gaming"] },
      { name: "MapGenie", url: "https://mapgenie.io/", description: "Interactive game maps", tags: ["maps", "guide", "interactive"] },
      { name: "GameStatus", url: "https://gamestatus.info/en", description: "Game server status", tags: ["status", "servers", "uptime"] },
      { name: "Library of Codexes", url: "https://libraryofcodexes.com/", description: "In-game book archive (Elder Scrolls, Mass Effect, WoW…)", tags: ["lore", "books", "rpg", "archive"] },
      { name: "HowLongToBeat", url: "https://howlongtobeat.com/", description: "Game completion times", tags: ["completionist", "time", "tracker"] },
      { name: "IsThereAnyDeal", url: "https://isthereanydeal.com/", description: "Game deal tracker", tags: ["deals", "prices", "sale"] },
      { name: "PCGamingWiki", url: "https://www.pcgamingwiki.com/wiki/Home", description: "PC game fixes & tweaks", tags: ["wiki", "fixes", "tweaks", "pc"] },
      { name: "DOS.zone", url: "https://dos.zone/", description: "Play DOS games in browser", tags: ["dos", "retro", "browser", "classic"] },
      { name: "CS2 Skins Market", url: "https://csgoskins.gg/", description: "CS2 market prices", tags: ["cs2", "skins", "market", "prices"] },
      { name: "CS2 Inspects", url: "https://cs2inspects.com/fr", description: "CS2 item inspections", tags: ["cs2", "inspect", "items"] },
      { name: "CS2 Points", url: "https://cs2points.com/", description: "CS2 points tracker", tags: ["cs2", "points", "tracker"] },
      { name: "Instant Gaming News", url: "https://news.instant-gaming.com/fr", description: "Gaming news", tags: ["news", "gaming"] },
    ],
  },
  {
    id: "steam",
    label: "Steam",
    icon: "🔵",
    links: [
      { name: "SteamBrew (Millennium)", url: "https://steambrew.app/", description: "Steam client modding", tags: ["mod", "client", "themes"] },
      { name: "Depressurizer", url: "https://github.com/Depressurizer/Depressurizer", description: "Steam library organizer", tags: ["library", "organizer", "categories"] },
      { name: "SteamLadder", url: "https://steamladder.com/", description: "Steam profile ranking", tags: ["ranking", "profile", "stats"] },
      { name: "SteamStatus", url: "https://steamstat.us/", description: "Steam network status", tags: ["status", "network", "uptime"] },
      { name: "SteamDB", url: "https://steamdb.info/", description: "Steam database & price history", tags: ["database", "prices", "history"] },
      { name: "Steampeek", url: "https://steampeek.hu/", description: "Game discovery", tags: ["discovery", "recommendations"] },
    ],
  },
  {
    id: "roms-downloads",
    label: "ROMs & Downloads",
    icon: "📦",
    links: [
      { name: "r/Roms Megathread", url: "https://r-roms.github.io/", description: "ROM download megathread", tags: ["roms", "emulation", "retro"] },
      { name: "Rentry PC Games DDL", url: "https://rentry.org/pgames#direct-download-ddl-sites", description: "Direct download game sites list", tags: ["ddl", "games", "download"] },
      { name: "PreDB", url: "https://predb.net/", description: "Release database", tags: ["releases", "scene", "database"] },
      { name: "CrackWatcher", url: "https://crackwatcher.com/", description: "Game crack status tracker", tags: ["crack", "drm", "status"] },
      { name: "CrackRelease", url: "https://crackrelease.com/", description: "Crack release news", tags: ["crack", "releases", "news"] },
      { name: "Gam.onl", url: "https://gam.onl/", description: "Game downloads", tags: ["games", "download"] },
      { name: "Movix.cash", url: "https://movix.cash/", description: "Movies & shows download", tags: ["movies", "series", "download"] },
      { name: "Archive (Mega)", url: "https://mega.nz/file/R4pxBYZa#aYnBbWu_pyDrokT8J1GUmDGL8RmtqHJ8AOchdOIZolY", description: "Archive file on Mega", tags: ["archive", "mega"] },
    ],
  },
  {
    id: "streaming",
    label: "Streaming",
    icon: "📺",
    links: [
      { name: "Streamed.pk", url: "https://streamed.pk/", description: "Live sport streaming", tags: ["sport", "live", "streaming"] },
      { name: "Voir Anime", url: "https://voiranime.rip/", description: "Anime streaming (FR)", tags: ["anime", "streaming", "français"] },
      { name: "Hydracker (DarkiWorld)", url: "https://hydracker.com/", description: "Streaming & download hub", tags: ["streaming", "download", "hub"] },
      { name: "FMHY – Non-English", url: "https://fmhy.pages.dev/non-english", description: "Multilingual streaming megathread", tags: ["megathread", "streaming", "international"] },
      { name: "FMHY – Français", url: "https://fmhy.pages.dev/non-english#french-francais", description: "French streaming & download links", tags: ["français", "streaming", "download"] },
      { name: "Rentry Mega Thread", url: "https://rentry.co/zdno5k4z", description: "Streaming & download list", tags: ["megathread", "streaming", "list"] },
      { name: "Anime Index (theindex.moe)", url: "https://theindex.moe/library/anime", description: "Anime resource index", tags: ["anime", "index", "resources"] },
      { name: "MegaMegaThread", url: "https://pastebin.com/SuwS6kri", description: "All-in-one streaming & download list", tags: ["megathread", "streaming", "download"] },
    ],
  },
  {
    id: "collections",
    label: "Collections & Tracking",
    icon: "📚",
    links: [
      { name: "Letterboxd", url: "https://letterboxd.com/", description: "Film diary & reviews", tags: ["films", "journal", "reviews", "social"] },
      { name: "Backloggd", url: "https://backloggd.com/", description: "Game backlog tracker", tags: ["games", "backlog", "tracker"] },
      { name: "Rebrickable", url: "https://rebrickable.com/build/", description: "LEGO set builder", tags: ["lego", "sets", "builder"] },
    ],
  },
  {
    id: "film-media",
    label: "Film & Media",
    icon: "🎬",
    links: [
      { name: "FilmGrab", url: "https://film-grab.com/", description: "Film screenshot database", tags: ["screenshots", "cinematography", "films"] },
      { name: "MoviePosterDB", url: "https://www.movieposterdb.com/", description: "Movie poster archive", tags: ["posters", "movies", "archive"] },
    ],
  },
  {
    id: "pc-hardware",
    label: "PC Building & Hardware",
    icon: "💻",
    links: [
      { name: "PCPartPicker", url: "https://be.pcpartpicker.com/list/", description: "PC build planner & compatibility checker", tags: ["build", "compatibility", "prices"] },
      { name: "BuildCores", url: "https://www.buildcores.com/", description: "PC build configurator", tags: ["build", "configurator", "pc"] },
      { name: "PCIe Simulator", url: "https://pcie-simulator.vercel.app/", description: "PCIe lane simulator", tags: ["pcie", "lanes", "simulator"] },
      { name: "StartMyCar", url: "https://www.startmycar.com/fr", description: "Car specs & comparisons", tags: ["car", "specs", "comparisons"] },
    ],
  },
  {
    id: "comparisons",
    label: "Comparisons & Benchmarks",
    icon: "📊",
    links: [
      { name: "Mouse / Mousepad / IEM Test", url: "https://docs.google.com/spreadsheets/d/1NMDwOkn3uynv7aIBZxrIl9kLiV7t9OXJJIFySD-pOrY/edit?gid=2062135880#gid=2062135880", description: "Peripheral comparison spreadsheet", tags: ["mouse", "mousepad", "iem", "comparison"] },
      { name: "SSD Comparaison", url: "https://docs.google.com/spreadsheets/d/1CVS1pg1Ln8q52f6vPV45PTQZCUjB33-FugqLhwpND3A/edit?gid=0#gid=0", description: "SSD performance comparison", tags: ["ssd", "storage", "benchmark"] },
      { name: "Tierlist Alimentation PC", url: "https://docs.google.com/spreadsheets/d/1wAcWruFXxGAw0ckt8sn_YaajzSLOdG7vq1WmmEwwo3c/edit?gid=1719706335#gid=1719706335", description: "PSU power supply tierlist", tags: ["psu", "alimentation", "tierlist"] },
      { name: "GPU Test Benchmark", url: "https://docs.google.com/spreadsheets/d/1H_ZJVRr_1yr8dnUE2FlrUMaWectzKoLhzXMQQoPJGmk/edit?gid=757992332#gid=757992332", description: "GPU benchmark comparison", tags: ["gpu", "benchmark", "comparison"] },
      { name: "CanYouRunIt", url: "https://www.systemrequirementslab.com/cyri", description: "PC requirements checker", tags: ["requirements", "pc", "checker"] },
      { name: "MouseCtrl – Mousepads", url: "https://mousectrl.com/mousepads", description: "Mousepad database & comparison", tags: ["mousepad", "database", "comparison"] },
      { name: "UserDiag", url: "https://userdiag.com/fr/", description: "PC diagnostics tool", tags: ["diagnostics", "pc", "tool"] },
      { name: "HumanBenchmark", url: "https://humanbenchmark.com/", description: "Reaction time & cognitive tests", tags: ["reaction", "benchmark", "test"] },
    ],
  },
  {
    id: "editing",
    label: "Editing Tools",
    icon: "✏️",
    links: [
      { name: "Photopea", url: "https://www.photopea.com/", description: "Online Photoshop alternative", tags: ["photo", "editor", "photoshop"] },
      { name: "Canva", url: "https://www.canva.com/fr_be/", description: "Graphic design platform", tags: ["design", "graphics", "templates"] },
      { name: "Pixlr", url: "https://pixlr.com/fr/", description: "Online photo editor", tags: ["photo", "editor", "online"] },
      { name: "Flaticon", url: "https://www.flaticon.com/fr/", description: "Free icons library", tags: ["icons", "svg", "free"] },
      { name: "VocalRemover", url: "https://vocalremover.org/fr/", description: "AI vocal removal", tags: ["audio", "vocal", "ai", "music"] },
    ],
  },
  {
    id: "tools",
    label: "Web Tools & Utilities",
    icon: "🔧",
    links: [
      { name: "IT-Tools", url: "https://it-tools.tech/", description: "Developer & IT utilities collection", tags: ["dev", "tools", "utilities"] },
      { name: "Blueprint.am", url: "https://www.blueprint.am/", description: "Directory of useful tools", tags: ["directory", "tools", "index"] },
      { name: "Delphi Tools", url: "https://delphi.tools/", description: "AI tools directory", tags: ["ai", "directory", "tools"] },
      { name: "123apps", url: "https://123apps.com/fr/", description: "Online multimedia tools", tags: ["multimedia", "convert", "tools"] },
      { name: "PaperAnimator", url: "https://paperanimator.com/", description: "Animate paper characters", tags: ["animation", "paper", "creative"] },
      { name: "PaperMe", url: "https://paperme.pixzens.com/fr", description: "Create paper avatars", tags: ["avatar", "paper", "creative"] },
      { name: "Fantasy Map Generator", url: "https://azgaar.github.io/Fantasy-Map-Generator/", description: "Procedural fantasy map generator", tags: ["map", "fantasy", "generator", "creative"] },
      { name: "StampLab", url: "https://stamplab.javii.tools/", description: "Custom stamp creator", tags: ["stamp", "creator", "design"] },
      { name: "Smart Servier", url: "https://smart.servier.com/", description: "Medical illustration library", tags: ["medical", "illustrations", "free"] },
      { name: "ArnissMC", url: "https://arnismc.com/", description: "Minecraft tools", tags: ["minecraft", "tools"] },
      { name: "DownDetector", url: "https://downdetector.fr/", description: "Site & service outage tracker", tags: ["outage", "status", "tracker"] },
      { name: "ShopYourTv", url: "https://www.shopyourtv.com/", description: "Find products seen on TV", tags: ["tv", "shopping", "products"] },
      { name: "LibriVox", url: "https://librivox.org/search?primary_key=0&search_category=author&search_page=1&search_form=get_results&search_order=alpha", description: "Free public domain audiobooks", tags: ["audiobooks", "free", "public domain"] },
      { name: "WhoSampled", url: "https://www.whosampled.com/", description: "Music sample & cover database", tags: ["music", "samples", "covers"] },
      { name: "PimEyes", url: "https://pimeyes.com/en", description: "Reverse face image search", tags: ["face", "search", "reverse image"] },
    ],
  },
  {
    id: "extensions",
    label: "Chrome Extensions",
    icon: "🧩",
    links: [
      { name: "FastStream Video Player", url: "https://chromewebstore.google.com/detail/faststream-video-player/kkeakohpadmbldjaiggikmnldlfkdfog", description: "Advanced video player for streams", tags: ["video", "player", "streaming"] },
      { name: "Return YouTube Dislike", url: "https://chromewebstore.google.com/detail/return-youtube-dislike/gebbhagfogifgggkldgodflihgfeippi", description: "Restore dislike count on YouTube", tags: ["youtube", "dislike", "extension"] },
      { name: "Video DownloadHelper", url: "https://chromewebstore.google.com/detail/video-downloadhelper/lmjnegcaeklhafolokijcfjliaokphfk", description: "Download videos from any site", tags: ["download", "video", "extension"] },
      { name: "Video Downloader Professional", url: "https://chromewebstore.google.com/detail/video-downloader-professi/elicpjhcidhpjomhibiffojpinpmmpil", description: "Pro video downloader", tags: ["download", "video", "pro"] },
      { name: "IGraal", url: "https://fr.igraal.com/parrainage?parrain=AG_599dd29e08cd5&utm_medium=raf&utm_source=refer_friend", description: "Cashback browser extension", tags: ["cashback", "extension", "savings"] },
    ],
  },
  {
    id: "projets-perso",
    label: "Projets Perso",
    icon: "👨‍💻",
    links: [
      { name: "LoL Duel & Team Build", url: "https://wassimel.github.io/LoL-duel-and-team-build/", description: "League of Legends tool", tags: ["lol", "league", "team", "build"] },
      { name: "Stockit", url: "https://stockit-drab.vercel.app/", description: "Stock & collection tracker", tags: ["collection", "tracker"] },
      { name: "Booster Open", url: "https://booster-open.vercel.app/", description: "Booster Open project", tags: ["booster", "open"] },
    ],
  },
  {
    id: "money",
    label: "Money & Rewards",
    icon: "💰",
    links: [
      { name: "Dealabs", url: "https://www.dealabs.com/", description: "French deal community", tags: ["deals", "promo", "community"] },
      { name: "FreeCash", url: "https://freecash.com/r/gagner_de_largent", description: "Earn money completing tasks", tags: ["rewards", "cashback", "earn"] },
      { name: "Swagbucks", url: "https://www.swagbucks.com/p/login?lang=fr", description: "Earn rewards for activities — surveys, videos, games", tags: ["rewards", "cashback", "surveys", "swagbucks"] },
      { name: "Ipsos iSay", url: "https://www.ipsosisay.com/fr-be", description: "Paid opinion surveys", tags: ["surveys", "opinions", "paid"] },
    ],
  },
];
