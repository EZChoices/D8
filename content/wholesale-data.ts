export const wholesaleData = {
  instructions: {
    how_to_use: [
      "Each product has cost, WSP (wholesale), and MSRP (retail).",
      "If qty_breaks_ref is present (e.g. 'disp', 'crt'), apply the matching rules in quantity_breaks to compute discounted WSP for larger orders.",
      "Any product with 'b2b_only': true must be restricted to wholesale customers (no consumer checkout).",
      "Flower strains are listed individually, each with its LB price.",
      "When showing prices, round as provided in WSP/MSRP. Do not recompute unless cost changes.",
      "Services entries (e.g., Terpenes & Mixing) have no fixed price; mark as 'Contact for quote'."
    ],
    compliance: [
      "Show age-gate 21+ for all products.",
      "Do not display vapes/carts to D2C customers (B2B only).",
      "Use COAs to validate each batch (attach as metadata when available)."
    ]
  },
  meta: { version: "2025-09-23b", currency: "USD" },
  pricing: {
    wholesale_margin: { small: 0.25, mid: 0.2, large: 0.18 },
    msrp_multipliers: { vapes_carts: 1.7, distillates: 1.6, concentrates: 1.8, flower: 1.7 },
    rounding: { under_100: "cent", ge_100: "nearest_5" }
  },
  quantity_breaks: {
    disp: [
      { min_qty: 50, percent_off: 10 },
      { min_qty: 100, percent_off: 20 }
    ],
    crt: [
      { min_qty: 50, percent_off: 10 }
    ]
  },
  products: [
    /* =========================
       CONCENTRATES
       ========================= */
    { id:"conc-authenticake-badder-1oz", category:"Concentrates", subcategory:"Badder/Crumble", brand:"Authenticake", name:"Badder/Crumble", variant:null, pack:"1oz", unit:"oz", cost:160, wsp:200, msrp:288 },
    { id:"conc-authenticake-badder-4oz", category:"Concentrates", subcategory:"Badder/Crumble", brand:"Authenticake", name:"Badder/Crumble", variant:null, pack:"4oz", unit:"oz", cost:500, wsp:600, msrp:900 },
    { id:"conc-authenticake-badder-8oz", category:"Concentrates", subcategory:"Badder/Crumble", brand:"Authenticake", name:"Badder/Crumble", variant:null, pack:"8oz", unit:"oz", cost:900, wsp:1080, msrp:1620 },
    { id:"conc-authenticake-badder-16oz", category:"Concentrates", subcategory:"Badder/Crumble", brand:"Authenticake", name:"Badder/Crumble", variant:null, pack:"16oz", unit:"oz", cost:1700, wsp:2005, msrp:3060 },

    { id:"conc-hash-1g", category:"Concentrates", subcategory:"Hash", brand:null, name:"Pressed/Loose Hash", variant:null, pack:"1g", unit:"g", cost:10, wsp:12.5, msrp:18 },
    { id:"conc-hash-1oz", category:"Concentrates", subcategory:"Hash", brand:null, name:"Pressed/Loose Hash", variant:null, pack:"1oz", unit:"oz", cost:175, wsp:220, msrp:315 },
    { id:"conc-hash-1lb", category:"Concentrates", subcategory:"Hash", brand:null, name:"Pressed/Loose Hash", variant:null, pack:"1lb", unit:"lb", cost:1700, wsp:2005, msrp:3060 },

    { id:"conc-megadiamonds-14g", category:"Concentrates", subcategory:"THC Crystals (Mega Diamonds 99%)", brand:null, name:"THC Crystals / Mega Diamonds", variant:"99% THC", pack:"14g", unit:"g", cost:175, wsp:220, msrp:315 },
    { id:"conc-megadiamonds-1lb", category:"Concentrates", subcategory:"THC Crystals (Mega Diamonds 99%)", brand:null, name:"THC Crystals / Mega Diamonds", variant:"99% THC", pack:"1lb", unit:"lb", cost:3500, wsp:4130, msrp:6300 },

    { id:"conc-unbranded-badder-14g", category:"Concentrates", subcategory:"Badder/Crumble", brand:null, name:"Badder/Crumble (Unbranded)", variant:null, pack:"14g", unit:"g", cost:65, wsp:81.25, msrp:117 },
    { id:"conc-unbranded-badder-28g", category:"Concentrates", subcategory:"Badder/Crumble", brand:null, name:"Badder/Crumble (Unbranded)", variant:null, pack:"28g", unit:"g", cost:110, wsp:140, msrp:198 },
    { id:"conc-unbranded-badder-112g", category:"Concentrates", subcategory:"Badder/Crumble", brand:null, name:"Badder/Crumble (Unbranded)", variant:null, pack:"112g", unit:"g", cost:400, wsp:480, msrp:720 },
    { id:"conc-unbranded-badder-227g", category:"Concentrates", subcategory:"Badder/Crumble", brand:null, name:"Badder/Crumble (Unbranded)", variant:null, pack:"227g", unit:"g", cost:750, wsp:900, msrp:1350 },
    { id:"conc-unbranded-badder-454g", category:"Concentrates", subcategory:"Badder/Crumble", brand:null, name:"Badder/Crumble (Unbranded)", variant:null, pack:"454g", unit:"g", cost:1400, wsp:1650, msrp:2520 },

    { id:"conc-moonrocks-14g", category:"Concentrates", subcategory:"Live Resin Moonrocks", brand:null, name:"Live Resin Moonrocks", variant:null, pack:"14g", unit:"g", cost:65, wsp:81.25, msrp:117 },
    { id:"conc-moonrocks-28g", category:"Concentrates", subcategory:"Live Resin Moonrocks", brand:null, name:"Live Resin Moonrocks", variant:null, pack:"28g", unit:"g", cost:110, wsp:140, msrp:198 },
    { id:"conc-moonrocks-224g", category:"Concentrates", subcategory:"Live Resin Moonrocks", brand:null, name:"Live Resin Moonrocks", variant:null, pack:"224g", unit:"g", cost:750, wsp:900, msrp:1350 },
    { id:"conc-moonrocks-448g", category:"Concentrates", subcategory:"Live Resin Moonrocks", brand:null, name:"Live Resin Moonrocks", variant:null, pack:"448g", unit:"g", cost:1400, wsp:1650, msrp:2520 },

    { id:"conc-sunrocks-14g", category:"Concentrates", subcategory:"Live Resin Sun Rocks", brand:null, name:"Live Resin Sun Rocks", variant:"Gummy Wormz flower", pack:"14g", unit:"g", cost:65, wsp:81.25, msrp:117 },
    { id:"conc-sunrocks-28g", category:"Concentrates", subcategory:"Live Resin Sun Rocks", brand:null, name:"Live Resin Sun Rocks", variant:"Gummy Wormz flower", pack:"28g", unit:"g", cost:110, wsp:140, msrp:198 },
    { id:"conc-sunrocks-224g", category:"Concentrates", subcategory:"Live Resin Sun Rocks", brand:null, name:"Live Resin Sun Rocks", variant:"Gummy Wormz flower", pack:"224g", unit:"g", cost:750, wsp:900, msrp:1350 },
    { id:"conc-sunrocks-448g", category:"Concentrates", subcategory:"Live Resin Sun Rocks", brand:null, name:"Live Resin Sun Rocks", variant:"Gummy Wormz flower", pack:"448g", unit:"g", cost:1400, wsp:1650, msrp:2520 },

    { id:"conc-snowballs-14g", category:"Concentrates", subcategory:"Infused (Snow Balls)", brand:null, name:"Snow Balls", variant:null, pack:"14g", unit:"g", cost:95, wsp:120, msrp:171 },
    { id:"conc-snowballs-1oz", category:"Concentrates", subcategory:"Infused (Snow Balls)", brand:null, name:"Snow Balls", variant:null, pack:"1oz", unit:"oz", cost:170, wsp:215, msrp:306 },
    { id:"conc-snowballs-qp", category:"Concentrates", subcategory:"Infused (Snow Balls)", brand:null, name:"Snow Balls", variant:null, pack:"1/4lb", unit:"qp", cost:650, wsp:780, msrp:1170 },
    { id:"conc-snowballs-hp", category:"Concentrates", subcategory:"Infused (Snow Balls)", brand:null, name:"Snow Balls", variant:null, pack:"1/2lb", unit:"hp", cost:1100, wsp:1320, msrp:1980 },
    { id:"conc-snowballs-1lb", category:"Concentrates", subcategory:"Infused (Snow Balls)", brand:null, name:"Snow Balls", variant:null, pack:"1lb", unit:"lb", cost:2000, wsp:2360, msrp:3600 },

    { id:"conc-dab-syringe-1g", category:"Concentrates", subcategory:"Dab Syringe", brand:null, name:"Liquid Diamond Sauce Dab Syringe", variant:null, pack:"1g", unit:"g", cost:10, wsp:12.5, msrp:18 },

    /* =========================
       VAPES (B2B ONLY)
       ========================= */
    { id:"vape-ghosts-1g", category:"Vapes", subcategory:"Disposables", brand:"Ghosts", name:"Disposable", variant:"1g", pack:"each", unit:"ea", cost:6, wsp:7.5, msrp:10.2, b2b_only:true, qty_breaks_ref:"disp" },
    { id:"vape-cake-2g", category:"Vapes", subcategory:"Disposables", brand:"Cake", name:"Disposable", variant:"2g", pack:"each", unit:"ea", cost:8, wsp:10, msrp:13.6, b2b_only:true, qty_breaks_ref:"disp" },
    { id:"vape-ace-2g", category:"Vapes", subcategory:"Disposables", brand:"ACE", name:"Disposable", variant:"2g", pack:"each", unit:"ea", cost:13, wsp:16.25, msrp:22.1, b2b_only:true, qty_breaks_ref:"disp", notes:"Strong distillate; no liquid diamonds" },
    { id:"vape-muhas-2g", category:"Vapes", subcategory:"Disposables", brand:"Muhas", name:"Disposable", variant:"2g", pack:"each", unit:"ea", cost:13, wsp:16.25, msrp:22.1, b2b_only:true, qty_breaks_ref:"disp", notes:"Strong distillate; no liquid diamonds" },
    { id:"vape-packman-2g", category:"Vapes", subcategory:"Disposables", brand:"Packman", name:"Disposable", variant:"2g", pack:"each", unit:"ea", cost:15, wsp:18.75, msrp:25.5, b2b_only:true, qty_breaks_ref:"disp", notes:"Authenticator; LED screen" },
    { id:"vape-backpackboys-2g", category:"Vapes", subcategory:"Disposables", brand:"BackPackBoys", name:"Disposable", variant:"2g", pack:"each", unit:"ea", cost:15, wsp:18.75, msrp:25.5, b2b_only:true, qty_breaks_ref:"disp", notes:"Authenticator" },

    /* =========================
       CARTRIDGES (B2B ONLY)
       ========================= */
    { id:"cart-krt-1g", category:"Carts", subcategory:"510 Thread", brand:"KRT", name:"Cart", variant:"1g", pack:"each", unit:"ea", cost:5, wsp:6.25, msrp:8.5, b2b_only:true, qty_breaks_ref:"crt", notes:"Budget; harsh/cough; supplier says final price" },
    { id:"cart-friendlyfarm-1ml", category:"Carts", subcategory:"Live Resin Full Ceramic", brand:"Friendly Farm", name:"Full Ceramic Cart", variant:"1ml", pack:"each", unit:"ea", cost:8.5, wsp:10.63, msrp:14.45, b2b_only:true, qty_breaks_ref:"crt" },

    /* =========================
       FLOWER — BUDGET INDOORS (LB)
       ========================= */
    { id:"flw-budget-randomlow-lb", category:"Flower", subcategory:"Budget Indoors", brand:null, name:"Pound (LB)", strain:"Random Low (Overweight)", pack:"1lb", unit:"lb", cost:500, wsp:590, msrp:850, notes:"~460g net; some shake; no seeds/mold; low nose" },

    { id:"flw-budget-northernlights-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Northern Lights", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-watermelon-zkittles-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Watermelon Zkittles", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-wedding-cake-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Wedding Cake", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-sour-diesel-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Sour Diesel", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-permanent-marker-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Permanent Marker", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-apples-bananas-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Apples and Banana", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-biscotti-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Biscotti", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-pineapple-express-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Pineapple Express", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-strawberry-cough-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Strawberry Cough", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-unicorn-piss-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Unicorn Piss", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-apple-fritter-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Apple Fritter", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-alien-og-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Alien OG", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-durban-poison-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Durban Poison", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-lemon-skunk-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Lemon Skunk", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-mint-chocolate-chip-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Mint Chocolate Chip", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-melonade-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Melonade", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-lemon-cherry-gelato-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Lemon Cherry Gelato", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-gmo-cookies-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"GMO Cookies", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-white-runtz-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"White Runtz", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-rainbow-sherbet-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Rainbow Sherbet", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-super-silver-haze-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Super Silver Haze", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-gelato-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Gelato", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },
    { id:"flw-budget-ice-cream-cake-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Ice Cream Cake", pack:"1lb", unit:"lb", cost:600, wsp:710, msrp:1020 },

    { id:"flw-budget-shishkaberry-lb", category:"Flower", subcategory:"Budget Indoors", name:"Pound (LB)", strain:"Shishkaberry", pack:"1lb", unit:"lb", cost:800, wsp:945, msrp:1360 },

    /* =========================
       FLOWER — LED/BRANDED (LB)
       ========================= */
    { id:"flw-led-og-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"OG (Gassy/chemy nose)", pack:"1lb", unit:"lb", cost:1100, wsp:1300, msrp:1870 },
    { id:"flw-led-black-diamond-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Black diamond (Gassy/chemy nose)", pack:"1lb", unit:"lb", cost:1100, wsp:1300, msrp:1870 },

    { id:"flw-led-sherbdough-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Sherbdough (Canadian indoors) PRICE DROP", pack:"1lb", unit:"lb", cost:1200, wsp:1415, msrp:2040 },

    { id:"flw-led-la-runtz-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"LA Runtz", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-coco-channel-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Coco Channel", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-churro-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Churro (amazing churro nose)", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-white-tahoe-cookies-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"White tahoe cookies", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-bombshell-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Bombshell (medium/large nugs, zesty nose)", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-purple-punch-promo-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Purple Punch (Canadian indoors) promo", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-cali-kush-promo-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Cali Kush aka California (Canadian indoors) promo", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-red-velvet-promo-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Red Velvet (Canadian indoors) promo", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },
    { id:"flw-led-sour-apple-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Sour Apple (strong apple nose, lots of smalls)", pack:"1lb", unit:"lb", cost:1300, wsp:1535, msrp:2210 },

    { id:"flw-led-mac-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Miracle Alien Cookies (strong sweet nose)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-jealousy-og-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Jealousy OG (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-boof-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Boof (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-frozen-runtz-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Frozen Runtz (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-dosilato-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"DosiLato (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-gorilla-cookies-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Gorrilla Cookies (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-rainbow-cheddar-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Rainbow Cheddar (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-rocket-fuel-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Rocket Fuel (frosty + color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-nova-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"NOVA (color, super frosty)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-lung-buster-a-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Lung Buster (new batch looks different)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-the-sweeties-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"The Sweeties (has color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-cereal-milk-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Cereal Milk", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-purple-cherry-punch-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Purple Cherry Punch (frosty/100% purple)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-ultra-sour-chem-og-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Ultra Sour Chem OG (purple, strong nose, 7/10 structure)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-ice-cream-cake-1400-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Ice cream cake (frosty, mild nose)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-gelato-1400-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Gelato (lots of purple, gassy, mainly medium nugs)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-italian-ice-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Italian Ice (some purple, strong nose)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-velvet-cake-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Velvet Cake (strong sweet nose, some purple)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-georgia-pie-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Georgia Pie (sweet strong nose)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-suicide-girls-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Suicide Girls (frosty/light color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-zskittles-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Zskittles (color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-pcp-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"PCP (some coloring)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-zushi-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Zushi", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-strawberry-pave-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Stawberry Pave (really frosty)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-sunset-cookies-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Sunset Cookies", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-blitz-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Blitz (lots of purple/green, frosty)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-lung-buster-b-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Lung Buster (frosty/color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-bakers-fruit-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Bakers fruit (frosty/color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-purple-churro-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Purple Churro (hints of purple, fat round nugs, strong sweet churro smell)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-la-zkittlez-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"LA Zkittlez (green/color, mid/large nugs, famous LA dispensary)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-half-baked-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Half Baked (nice color)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },
    { id:"flw-led-goo-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"GOO (strong blueberry smell)", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },

    { id:"flw-led-mochi-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Mochi (purple inside/out, strong thin mint nose)", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-tropicana-cookies-orangehair-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Tropicana Cookies (purple inside/out, orange hair, strong tropical nose)", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-rs11-purple-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"RS11 (rainbow sherbet) frosty, Purple", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-spacequeen-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"SpaceQueen (purple, strong nose)", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-watermelon-gelato-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Watermelon gelato (frosty, watermelon nose, no smalls)", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-tropicana-cookies-allpurple-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Tropicana Cookies (all purple, strong sweet nose) some stems", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-blizzard-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Blizzard (purple frost, mainly mediums)", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },
    { id:"flw-led-purple-cotton-candy-1500-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Purple Cotton Candy (purple frosty, strong cotton candy smell)", pack:"1lb", unit:"lb", cost:1500, wsp:1770, msrp:2550 },

    { id:"flw-led-oreoz-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"OREOZ (all purple, large frosty nugs, strong sweet smell)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-apple-banana-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Apple Banana (frosty, purple, strong apple/banana smell, long nugs)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-black-cherry-punch-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Black Cherry Punch (top shelf, purple, large nugs, strong nose)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-ice-cream-cookies-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Ice cream Cookies (Cookies brand, top shelf, large nugs, all purple, strong sweet nose)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-c3-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"C3 (Chemdawg X Lemon Thai-Pakistani) top shelf, 100% purple, strong nose, frosty", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-gelato-cake-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Gelato Cake (purple, mid/large nugs)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-peanut-butter-cookies-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Peanut Butter Cookies (large, purple, strong nose)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-star-berry-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Star Berry (all purple, mediums/large only, frosty, strong berry nose)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },
    { id:"flw-led-strawberry-jelly-1600-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"Strawberry Jelly (purple, strawberry smell)", pack:"1lb", unit:"lb", cost:1600, wsp:1890, msrp:2720 },

    /* =========================
       FLOWER — RS11 @ $1400 group
       ========================= */
    { id:"flw-led-rs11-green-1400-lb", category:"Flower", subcategory:"LED/Branded", name:"Pound (LB)", strain:"RS11 (rainbow sherbet) frosty, green", pack:"1lb", unit:"lb", cost:1400, wsp:1650, msrp:2380 },

    /* =========================
       DISTILLATES
       ========================= */
    { id:"dist-budget-1oz", category:"Distillates", subcategory:"Budget Clear/Gold", brand:null, name:"Distillate - Budget Clear/Gold", variant:"60% purity", pack:"1oz", unit:"oz", cost:55, wsp:68.75, msrp:88 },
    { id:"dist-budget-1000g", category:"Distillates", subcategory:"Budget Clear/Gold", brand:null, name:"Distillate - Budget Clear/Gold", variant:"60% purity", pack:"1000g", unit:"1000g", cost:1000, wsp:1180, msrp:1600 },

    { id:"dist-exotic-1oz", category:"Distillates", subcategory:"Exotic Distillate", brand:null, name:"Distillate - Exotic", variant:"92% purity", pack:"1oz", unit:"oz", cost:70, wsp:87.5, msrp:112 },
    { id:"dist-exotic-1000g", category:"Distillates", subcategory:"Exotic Distillate", brand:null, name:"Distillate - Exotic", variant:"92% purity", pack:"1000g", unit:"1000g", cost:2000, wsp:2360, msrp:3200 },

    { id:"dist-liquid-diamonds-1000g", category:"Distillates", subcategory:"Liquid Diamonds", brand:null, name:"Distillate - Liquid Diamonds", variant:"98%+ purity", pack:"1000g", unit:"1000g", cost:3000, wsp:3540, msrp:4800 },

    /* =========================
       SERVICES
       ========================= */
    { id:"svc-terpenes-mixing", category:"Services", subcategory:"Terpenes & Mixing", brand:null, name:"Terpenes & Mixing", variant:null, pack:null, unit:null, cost:null, wsp:null, msrp:null, notes:"Available on request; per-project pricing" }
  ]
} as const;

export type WholesaleRawProduct = typeof wholesaleData.products[number];
