"use strict";function setOfCachedUrls(a){return a.keys().then(function(a){return a.map(function(a){return a.url})}).then(function(a){return new Set(a)})}var precacheConfig=[["/index.html","cda3129ade424788897bad2036bfc561"],["/main.fb86acf2.css","fb86acf2ff2eb318d0cada254ec2f0dd"],["/static/css/main.590fdfb4.css","590fdfb40e04c535c7cecc7de7c98c5c"],["/static/js/0.0129b28e.chunk.js","22f6847fe53f2999679509af7d166950"],["/static/js/1.d794a038.chunk.js","46ed03c5d926cbbdb0532ada76ff1a32"],["/static/js/10.55dba766.chunk.js","236b92b5c109dea2cc1209dc74b99293"],["/static/js/11.1130f5a5.chunk.js","e0bf2e1e696c1642f6fc91a5b3c8e670"],["/static/js/12.f82fe200.chunk.js","9397d88c7f0e4dc94b24ddcc52d68d19"],["/static/js/13.226b5c9c.chunk.js","aa2c782ecaf4c982ad956517e297971d"],["/static/js/14.eb6dae59.chunk.js","b8974854e25f32383d0283d470256919"],["/static/js/15.d8f3474f.chunk.js","60e29d2d900edb6f20097a039bff6b88"],["/static/js/16.d598f0b8.chunk.js","88c0afa205822e0b58ecdcdcc733bba5"],["/static/js/17.fa7f5173.chunk.js","4bd9b6f13436daa6c874a1237363e0a3"],["/static/js/18.4afff048.chunk.js","3431bf3c00b444b9d7865d96e0cb1a72"],["/static/js/19.5a42a8d8.chunk.js","bf481fd1c09604ccb64f47edeee8a83d"],["/static/js/2.83eb5fd4.chunk.js","1c2fe1e0ccd11ead4f1993a29c59f776"],["/static/js/20.b8e0219b.chunk.js","896ef823195bf6270ce79b73c5b3ed38"],["/static/js/21.14b7978c.chunk.js","d9751c6529d302a175a46112beeaa89b"],["/static/js/22.b96a61c7.chunk.js","86494c6f50d9662ea25508e8e102c253"],["/static/js/23.cb1918c1.chunk.js","769fbc5cd0f1292bf9db4655ba8794b3"],["/static/js/24.fed015a1.chunk.js","be332d778e67a172eb40024fd7feedb5"],["/static/js/25.c5e467cb.chunk.js","34b0162cd824308b1920fdd131b71617"],["/static/js/26.88b8ac6c.chunk.js","daff3105619e50574137bc7eae616840"],["/static/js/27.fbebc442.chunk.js","7429b030e68db534294ada0e69c648d2"],["/static/js/28.0bf5e172.chunk.js","fdc27a677b186fd5e71625b057a183b0"],["/static/js/29.c4f95f00.chunk.js","79551ab0c6510bd5d29a3752f3b71fc6"],["/static/js/3.7eae489c.chunk.js","7f8b212bd969188194b328a0777bae4f"],["/static/js/30.33a295f7.chunk.js","ecd2a8c06f98859c0c3735c4cc433a3d"],["/static/js/31.dcd60de9.chunk.js","789ed802227b111ef189507a45150f29"],["/static/js/32.2972ca9a.chunk.js","eaa49aef8b9e1c6896dcc164134fad57"],["/static/js/33.79fdce4a.chunk.js","2498991a15af60f7771f4efa18513133"],["/static/js/34.bdd1271c.chunk.js","df53e2c318d4a1f0ed309a4f61334a7a"],["/static/js/35.72e5586f.chunk.js","2ef8f0a9428a64a29fe1dc2fa2131c76"],["/static/js/36.b37efa48.chunk.js","146c783cba25fbdd7810ec847e77cfbb"],["/static/js/37.60aca6ba.chunk.js","7865685fb726160a8c014d40c9356a1a"],["/static/js/38.11899599.chunk.js","d742d9f8504ca8e63acc997017b2e521"],["/static/js/39.0f12069a.chunk.js","05179a4a954f371346d9f89ef0574ff4"],["/static/js/4.b7563bb5.chunk.js","ba49f6578f36aa4035decc961d974d28"],["/static/js/40.913f06f0.chunk.js","3d62dcbab001a5a6bb23f4766bc7b912"],["/static/js/41.f55a2293.chunk.js","cbf699195b8b0375b3ed60b88f512cb6"],["/static/js/42.9a0fd725.chunk.js","01e373840347ae0d94090dcf53f50772"],["/static/js/43.56e4debf.chunk.js","cd910f91effc2b7197048ee890282ebb"],["/static/js/44.da7e613b.chunk.js","3f422a90a7240802a787b1bfae0e98e5"],["/static/js/45.2e174619.chunk.js","a60e4cf7c446fab5f0e0b85fe8ae7c81"],["/static/js/46.31b2580c.chunk.js","cf39ef18ef6abff129d52d9858fdc2bb"],["/static/js/47.148483d3.chunk.js","5180b34e24b60bea95a1e46078c4f22e"],["/static/js/48.01ed132a.chunk.js","76484c1cd0954a170706444ff4ee31e9"],["/static/js/49.82b63e8b.chunk.js","2d1fd6b9a70edda20e84f0b95326ef64"],["/static/js/5.7f23f152.chunk.js","304db86bcf94f6a5722bfa2650fe2b89"],["/static/js/50.b7d34f1f.chunk.js","5ae68dde766863a27332d1d237999445"],["/static/js/51.a921958b.chunk.js","40deabc824553d2a93a5d73c2ccf753d"],["/static/js/52.9db4e6b6.chunk.js","fea311c03c2751ba562408d2398913f7"],["/static/js/53.f3315754.chunk.js","97dacd731eaac8dfa81d95d2ecdcfbdb"],["/static/js/54.db7f13f6.chunk.js","cc2b0f8618a4d9ac6906ff44a22a504a"],["/static/js/55.ecaf6bf1.chunk.js","ddb9023c91e00341d8d6449b31eb67e6"],["/static/js/56.fecd93a9.chunk.js","13c7e5ede7763e84fd579d5909b61040"],["/static/js/57.090937c9.chunk.js","0ea216a5f83abe3c135e064260c69af5"],["/static/js/58.01f97f74.chunk.js","63dbee23b54ba0c12535bced9460adb1"],["/static/js/59.e63f82a2.chunk.js","165bf1ae8e3617c162057a4c1a91559b"],["/static/js/6.90c24ff3.chunk.js","0eea23fe787a6bfd3c1d3267efcb21d1"],["/static/js/60.609499b8.chunk.js","048cd0f4bf3d0b6be271671bcf349361"],["/static/js/61.83a727ef.chunk.js","c05e3754cb453b4a0d51ef97bf2e0471"],["/static/js/62.7f17210e.chunk.js","388e58a6ab0098e22d556d7fc26445ad"],["/static/js/63.ade80c87.chunk.js","2bdee4715687a59e903d21d8e95650a5"],["/static/js/64.a01ab921.chunk.js","e455dc796074c0125575b56f4ebf1ec2"],["/static/js/65.916363db.chunk.js","b2971546f25971a439836b759c4021ef"],["/static/js/66.d0725ed7.chunk.js","b695f1b74dde56d3c579ad4e7c07a6bb"],["/static/js/67.49a81870.chunk.js","3551be78c68595c93f2d5617dd55dfcf"],["/static/js/68.3a0e9317.chunk.js","84119c228bd5c3287308e0bcc97df866"],["/static/js/7.dfe5394e.chunk.js","0dcbd50c4927a5a3060a8422bab32f07"],["/static/js/8.3c0d50cb.chunk.js","443bf36eb3689e7eb511e1b3e9580991"],["/static/js/9.84b30a83.chunk.js","7f60072cdb157022df5eaebf7102d942"],["/static/js/ReactChart2-Doughnut.d27fefd1.chunk.js","527d025362cdb7585beb88629b01f290"],["/static/js/ReactChart2-bar.7b413afd.chunk.js","8415e267c221a53beb0b3bd889e623da"],["/static/js/ReactChart2-box.aa7d9240.chunk.js","1578b9210c046ea8f98513e77bdc21a0"],["/static/js/ReactChart2-bubble.697808f4.chunk.js","298640436aa49cb823ebf031add4e09e"],["/static/js/ReactChart2-contentHolder.04258568.chunk.js","acb878c8d3e16752e170a052ca7487eb"],["/static/js/ReactChart2-dynamic-doughnut.d9b69bed.chunk.js","dea889d614dc5551f9701d9d124ffabe"],["/static/js/ReactChart2-horizontalBar.b860d348.chunk.js","6fe7a3eb1f088d607d5fa4da3efbe120"],["/static/js/ReactChart2-layoutWrapper.3a95130f.chunk.js","c682977d3c6bc78b2b0a04bc32c39904"],["/static/js/ReactChart2-line.3b5c90bd.chunk.js","6e1fa34d5ab623c427eff8b39dfc7f8a"],["/static/js/ReactChart2-mix.cfa7d609.chunk.js","c9bc7afce4efb948bbab7fc9d721e6cf"],["/static/js/ReactChart2-pageHeader.4cc450ff.chunk.js","68261ec298668517eb5f8bf5a4d61bac"],["/static/js/ReactChart2-pie.003e5d51.chunk.js","7c0404deab31c397cec75f9aad41322b"],["/static/js/ReactChart2-polar.11cbdbde.chunk.js","ab04055a8bc317378fcc2eff0f6d0b62"],["/static/js/ReactChart2-radar.3d6c2ea3.chunk.js","48214ef8a64d7a9c36940f767cd41d05"],["/static/js/ReactChart2-randomizedLine.ddfe3a46.chunk.js","f92d9c959599028e2a7639d6e2cd9b99"],["/static/js/forms-editor.2a8ceac6.chunk.js","ff455c5e8a13c1dfb7cf03fcbc728770"],["/static/js/googleChart.eae60bfc.chunk.js","c7a591b286b061c0b9b748814bd6bc84"],["/static/js/main.f0efbde6.js","fb6a0b08706ba480e7e6952bc3e16d34"],["/static/js/react-trend.470a8145.chunk.js","762c34b13e6c60f86b430650922eddbe"],["/static/js/react-vis-animatedSunburst.b6733cba.chunk.js","2b9b4695a81b83bde50bd2c273bcea28"],["/static/js/react-vis-basicSunburst.ff42f703.chunk.js","e57e920bf21067ec5c5856f486fda0bd"],["/static/js/react-vis-candleStick.50303d27.chunk.js","0754e42af0d6526c4fd54aa5064e6290"],["/static/js/react-vis-circularGridLines.06dd63fa.chunk.js","fa41ca8f360d3ad2d2c3a25abacb4469"],["/static/js/react-vis-clusteredStackedBarChart.151a191b.chunk.js","f30555d13950b096b7a47b170c17e4fa"],["/static/js/react-vis-complexChart.c9a38597.chunk.js","889f5d429d6d39a12389d97d979584bc"],["/static/js/react-vis-customRadius.4bbb1170.chunk.js","b30c0cac274b65a6ef2002a6cf183bf0"],["/static/js/react-vis-customScales.7dbde96b.chunk.js","57f4133744ce9978ef20d65e9b88e482"],["/static/js/react-vis-dynamicCrosshairScatterplot.880185f4.chunk.js","757eff183f2430ab626098fda1176e44"],["/static/js/react-vis-dynamicProgrammaticRightedgehints.5fce6cf7.chunk.js","751ee1bf4dbf99415da0355f616f1085"],["/static/js/react-vis-dynamicTreeMap.346fcda4.chunk.js","3a7e7fd6d5d21e57075b935e937a4ce2"],["/static/js/react-vis-lineMark.feeda6fa.chunk.js","e5680f73ebf72be83d3b2d169221a7e7"],["/static/js/react-vis-lineSeries.37a00b5e.chunk.js","7304ea28ceff0c8ae4760c18a682a995"],["/static/js/react-vis-simpleDonutChart.1aecdb0b.chunk.js","7393f3783434ac2adee21c63c58d6348"],["/static/js/react-vis-simpleRadialChart.3a98b749.chunk.js","3b42dcaf82fc0488d1b56e9a5ec711b2"],["/static/js/react-vis-simpleTreeMap.e1dc16b5.chunk.js","f9afe4351793f9255c3d537da6faf840"],["/static/js/react-vis-stackedHorizontalBarChart.04e65d05.chunk.js","20f274640d6c3b640dd5e327434b67f5"],["/static/js/react-vis-streamGraph.d811a538.chunk.js","57b55333fa19ce9e4a671f1a611db2aa"],["/static/js/rechartx-biaxialBarChart.da8a3ef3.chunk.js","03a048e3803e7f2cc865847469932415"],["/static/js/rechartx-customActiveShapePieChart.c8a2f937.chunk.js","c42734c78f5771138b7d8fb344a582c4"],["/static/js/rechartx-customShapeBarChart.b1eff783.chunk.js","96aad7ab5b6718f1e17fe6ccf704aae4"],["/static/js/rechartx-customizedDotLineChart.5cfa2583.chunk.js","630b76e055c408af2eec0245d98e4684"],["/static/js/rechartx-legendEffectOpacity.2f4fc957.chunk.js","19f708fd80704023e4e41df1b4527727"],["/static/js/rechartx-lineBarAreaComposedChart.b3edeb05.chunk.js","aed6280853b933139af69cf75bb47740"],["/static/js/rechartx-mixBarChart.c6bd6db3.chunk.js","48ac10aeee0c0d64aa9b1c793bb7f78d"],["/static/js/rechartx-simpleAreaChart.f9a52019.chunk.js","d0bd3b9ac4c5e9509da5a4b1bb5ab5e3"],["/static/js/rechartx-simpleBarChart.5a34abcd.chunk.js","01f0df583140fceb1379abe07fed5c86"],["/static/js/rechartx-simpleLineCharts.00696423.chunk.js","aeca55c7a283fdf57dca62feb7a8718d"],["/static/js/rechartx-simpleRadialBarChart.def9045d.chunk.js","320c7d3243d1f62d9c93508e04965156"],["/static/js/rechartx-specifiedDomainRadarChart.c0a62f7d.chunk.js","689406d91829ee1a2d3bf43fc084f238"],["/static/js/rechartx-stackedAreaChart.bd60c605.chunk.js","a558e916df3a6837d8261b28c9941bc0"],["/static/media/1.57c4a8ee.jpg","57c4a8eee85156be8b96aca5f8488991"],["/static/media/2.b3c1af26.jpg","b3c1af263dfc26c4daaff934f66a3f3e"],["/static/media/3.ce8b33de.jpg","ce8b33deebfcb35dba62259312c59217"],["/static/media/4.54022705.jpg","540227055782999a73c80638dca9671c"],["/static/media/5.5daa9a7e.jpg","5daa9a7ee4062c3e64ed4403924df071"],["/static/media/6.b0b11045.jpg","b0b11045634ee42c0b4bdb62d12bccb4"],["/static/media/7.6f3b92ce.jpg","6f3b92ce2eb3ef570da604aa793fb85b"],["/static/media/algolia.fd4c766f.svg","fd4c766fbd98fd9765e22618a2865d28"],["/static/media/bucket.545fd26b.svg","545fd26b9adf577d566434eaf2ab0d70"],["/static/media/candlestick.32f3f818.scss","32f3f8185c457a58256082be72b6d5e2"],["/static/media/china.4e4d59b7.svg","4e4d59b7a0903071d743973f8e3b3aab"],["/static/media/france.bcd389de.svg","bcd389debadb2cf1c0332df62b80c1b9"],["/static/media/image1.1c979949.jpg","1c9799495a3b052d0804fd0562ae9662"],["/static/media/image3.d032955c.jpg","d032955c4314cf635a801dc49f74b96a"],["/static/media/image4.7db25367.jpg","7db253676738825728676e4c137d5ef8"],["/static/media/image5.603427e6.jpg","603427e6eaa565bed5f98f003c67bf23"],["/static/media/italy.604345b4.svg","604345b476aa52a0245ee2ffd3cd50db"],["/static/media/rob.b34fc52c.png","b34fc52c382add7ec9fa87c03adfe907"],["/static/media/sign.adf5846b.jpg","adf5846b1711fa8000cfd4c6c65a411d"],["/static/media/spain.6a9dc11f.svg","6a9dc11ff55791478b31156cd09b6b38"],["/static/media/uk.bc48afcc.svg","bc48afcc15d5d9d51255de0b2ee708be"],["/static/media/work.56bf9122.jpg","56bf912220fcc0ea7d0f6595a28f9a4d"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(a,c){var e=new URL(a);return"/"===e.pathname.slice(-1)&&(e.pathname+=c),e.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(c){return new Response(c,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(a,c,e,t){var s=new URL(a);return t&&s.pathname.match(t)||(s.search+=(s.search?"&":"")+encodeURIComponent(c)+"="+encodeURIComponent(e)),s.toString()},isPathWhitelisted=function(a,c){if(0===a.length)return!0;var e=new URL(c).pathname;return a.some(function(a){return e.match(a)})},stripIgnoredUrlParameters=function(a,c){var e=new URL(a);return e.hash="",e.search=e.search.slice(1).split("&").map(function(a){return a.split("=")}).filter(function(a){return c.every(function(c){return!c.test(a[0])})}).map(function(a){return a.join("=")}).join("&"),e.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(a){var c=a[0],e=a[1],t=new URL(c,self.location),s=createCacheKey(t,hashParamName,e,/\.\w{8}\./);return[t.toString(),s]}));self.addEventListener("install",function(a){a.waitUntil(caches.open(cacheName).then(function(a){return setOfCachedUrls(a).then(function(c){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(e){if(!c.has(e)){var t=new Request(e,{credentials:"same-origin"});return fetch(t).then(function(c){if(!c.ok)throw new Error("Request for "+e+" returned a response with status "+c.status);return cleanResponse(c).then(function(c){return a.put(e,c)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(a){var c=new Set(urlsToCacheKeys.values());a.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!c.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var c,e=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching);(c=urlsToCacheKeys.has(e))||(e=addDirectoryIndex(e,"index.html"),c=urlsToCacheKeys.has(e));!c&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(e=new URL("/index.html",self.location).toString(),c=urlsToCacheKeys.has(e)),c&&a.respondWith(caches.open(cacheName).then(function(a){return a.match(urlsToCacheKeys.get(e)).then(function(a){if(a)return a;throw Error("The cached response that was expected is missing.")})}).catch(function(c){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,c),fetch(a.request)}))}});