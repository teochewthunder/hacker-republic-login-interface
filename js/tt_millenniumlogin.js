function load_gallery()
{
	var row,thumbnail;
	var gallery=document.getElementById("gallery");

	for (var i=0;i<21;i++)
	{
		row=document.createElement("div");
		row.className="gallery_row";

		for (var j=0;j<10;j++)
		{
			thumbnail=document.createElement("div");
			thumbnail.className="thumbnail";
			thumbnail.id="img_"+((i*10)+j);
			thumbnail.style.backgroundImage="url(img/img_"+((i*10)+j)+".jpg)";
			thumbnail.innerHTML="#"+((i*10)+j+1);
			thumbnail.onclick=function(){open_overlay("gallery_overlay",this.id);};
			row.appendChild(thumbnail);
		}

		gallery.appendChild(row);
	}
}

function open_overlay(ovid,imgid)
{
	var overlay=document.getElementById(ovid);
	overlay.style.display="block";

	if (ovid=="login_overlay")
	{
		document.getElementById("login_form").style.display="block";
		document.getElementById("login_message").style.display="none";
	}

	if (ovid=="gallery_overlay")
	{
		var img_actual=document.getElementById("gallery_actual");
		img_actual.style.backgroundImage="url(img/"+imgid+".jpg)";
		img_actual.innerHTML="";

		var grid;

		for (var i=0;i<10;i++)
		{
			for (var j=0;j<10;j++)
			{
				grid=document.createElement("div");
				grid.className="gallery_grid";
				grid.id=imgid+"_"+i+"_"+j;
				grid.onclick=function(){process_grid(this.id)};
				img_actual.appendChild(grid);
			}
		}
	}
}

function process_grid(gridid)
{
	if (gridid=="img_166_0_8")
	{
		open_overlay("login_overlay",0);
	}
	else
	{
		var params=gridid.split("_");
		var url=getUrl(params[1]);
		window.open(url);
	}
}

function login(formid)
{
	var parameters;

	if (formid=="login_form")
	{
		document.getElementById("login_form").style.display="none";
		document.getElementById("login_message").style.display="block";

		parameters="type=0";
		parameters=parameters+"&id="+document.getElementById("login_id").value;
		parameters=parameters+"&password="+document.getElementById("login_password").value;

		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp_loginform=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp_loginform=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp_loginform.onreadystatechange=function()
		{
			if (xmlhttp_loginform.readyState==4 && xmlhttp_loginform.status==200)
			{
				var logindetails=JSON.parse(xmlhttp_loginform.responseText);

				if (logindetails.valid)
				{
					var errormessage=document.getElementsByClassName("message_error");
					errormessage[3].onclick=function(){window.location="confirm.php"};
				}
			}
		}

		xmlhttp_loginform.open("POST","ajax_login.php",true);
		xmlhttp_loginform.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp_loginform.send(encodeURI(parameters));	
	}

	if (formid=="confirm_form_login")
	{
		parameters="type=1";
		parameters=parameters+"&id="+document.getElementById("txtConfirmId").value;

		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp_loginform=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp_loginform=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp_loginform.onreadystatechange=function()
		{
			if (xmlhttp_loginform.readyState==4 && xmlhttp_loginform.status==200)
			{
				var logindetails=JSON.parse(xmlhttp_loginform.responseText);

				if (logindetails.valid)
				{
					confirm_screen(false,true);
				}
				else
				{
					confirm_screen(true,false);
				}
			}
		}

		xmlhttp_loginform.open("POST","ajax_login.php",true);
		xmlhttp_loginform.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp_loginform.send(encodeURI(parameters));	
	}

	if (formid=="confirm_form_password")
	{
		parameters="type=2";
		parameters=parameters+"&password="+document.getElementById("txtConfirmPassword").value;

		if (window.XMLHttpRequest)
		{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp_loginform=new XMLHttpRequest();
		}
		else
		{// code for IE6, IE5
			xmlhttp_loginform=new ActiveXObject("Microsoft.XMLHTTP");
		}
		
		xmlhttp_loginform.onreadystatechange=function()
		{
			if (xmlhttp_loginform.readyState==4 && xmlhttp_loginform.status==200)
			{
				var logindetails=JSON.parse(xmlhttp_loginform.responseText);

				if (logindetails.valid)
				{
					window.location="dashboard.php";
				}
				else
				{
					confirm_screen(true,false);

					if (parseInt(logindetails.attempts)>3)
					{
						alert("ACTIVATING DESTRUCT SEQUENCE...");
						window.location="index.html";
					}
				}
			}
		}

		xmlhttp_loginform.open("POST","ajax_login.php",true);
		xmlhttp_loginform.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp_loginform.send(encodeURI(parameters));
	}
}

function close_overlay(ovid)
{
	var overlay=document.getElementById(ovid);
	overlay.style.display="none";
}

function confirm_screen(id,password)
{
	document.getElementById("confirmid").style.display=(id?"block":"none");
	document.getElementById("confirmpassword").style.display=(password?"block":"none");
}

function getUrl(imgindex)
{
	var urls=[
		"http://www.atlantisbahamas.com/media/Things%20To%20Do/Water%20Park/Beaches/Gallery/waterpark_beaches_sexy.jpg",
		"http://cutedogandcat.xyz/wp-content/uploads/2016/06/cool-seeing-eye-dog-for-blind-dog-plus-a-brief-history-of-guide-dogs-the-best-dog-blog-dogpacer.jpg",
		"http://cdn.visitjacksonville.com/pages/4185/offshore_fishing__flexslider.jpg",
		"http://midcenturymotels.com/wp-content/uploads/2016/03/Blue-Swallow-Motel.jpg",
		"https://static-ssl.businessinsider.com/image/57e41098077dcc1c008b7964-2048/14066261_2122557997968462_5010985606905929631_o.jpg",
		"https://static01.nyt.com/images/2015/12/21/dining/21COOKING_DEVILSFOODCAKE/21COOKING_DEVILSFOODCAKE-superJumbo.jpg",
		"http://kingofwallpapers.com/race/race-002.jpg",
		"http://www.saint-petersburg.com/images/peterhof/grand-palace/throne-room-at-the-grand-palace-in-peterhof.jpg",
		"http://myamsterdamstay.com/wp-content/uploads/2016/02/amsterdam-arena_2.jpg",
		"http://www.after5creative.com.au/blog/wp-content/uploads/2012/03/workshop-51.jpg",
		"https://media1.popsugar-assets.com/files/thumbor/kSeP-PMxKLJ6LVAOAIhclbB1EFo/fit-in/1024x1024/filters:format_auto-!!-:strip_icc-!!-/2016/04/20/833/n/1922243/4f024cd9657d1ee0_USC1010155_035/i/Seeing-Eye-Dog-School-Photos.jpg",
		"http://all4desktop.com/data_images/original/4240222-ballet.jpg",
		"https://static.pexels.com/photos/7283/garden.jpg",
		"https://www.sovrn.com/wp-content/uploads/2015/11/waterfall_stream_rocks_landscape_86093_3840x2400.jpg",
		"http://cdn.sandals.com/beaches/v11/slideshows/activities/golf/home/slide-01.jpg",
		"http://www.leonlogothetis.com/wp-content/uploads/2015/08/1773565.jpg",
		"http://static.asiawebdirect.com/m/bangkok/portals/bangkok-com/homepage/magazine/best-night-markets/pagePropertiesImage/rod-fai-market-zone2.jpg",
		"http://www.buddhabar.com/img/carousel/Slides/Restaurants/Manille/1.jpg",
		"http://img.archiexpo.com/images_ae/photo-g/52773-5682971.jpg",
		"http://www.surfingindia.net/files/surf-files/u9/India_Surf_Tours_-_17__1_.jpg",
		"http://www.surteesboats.com/assets/Uploads/_resampled/large-Surtees-Boats-575-Workmate-Shark-Built-to-fish-NZ-Aus.jpg",
		"http://www.artifacting.com/blog/wp-content/uploads/2012/10/Rain-Room.jpg",
		"http://fieldsfestival.com/sites/default/files/saxmachineX_2.jpg",
		"https://www.rivernetwork.org/wp-content/uploads/2015/08/virgin-river-zion-natl-park-utah_small-1200x600.jpg",
		"http://wallpapers.wallpapersdepo.net/free-wallpapers/1518/Hilltop-.jpg",
		"http://www.hotelroomsearch.net/im/hotels/gr/hilltop.jpg",
		"http://i2.cdn.cnn.com/cnnnext/dam/assets/160331101115-restricted-01-palmyra-ruins-super-169.jpg",
		"http://kingofwallpapers.com/alley/alley-020.jpg",
		"http://animalia-life.club/data_images/squirrel/squirrel4.jpg",
		"http://kids.nationalgeographic.com/content/dam/kids/photos/animals/Mammals/Q-Z/zebra-mother-foal.jpg.adapt.945.1.jpg",
		"http://www.mining.com/wp-content/uploads/2016/02/consol-energy_coal-mining.jpg",
		"http://obfessed.com/wp-content/uploads/2015/05/festivalgirl.jpg",
		"https://cityofwinterpark.org/wp-content/uploads/2014/05/DinkyDockPark_Field.jpg",
		"http://az616578.vo.msecnd.net/files/2016/06/16/636016408885022794-938565380_amazing-hollywood-blockbuster-marching-band-show-header.jpg",
		"https://www.horizonstructures.com/sites/default/files/storage-shed-cape-cod-dormer-with-cupola-and-weathervane.jpg",
		"https://peteslawncare.s3.amazonaws.com/wp-content/uploads/2014/04/fertilization-slider.jpg",
		"http://www.visithistoricsavannah.com/images/blogs/savannah/lucas-backstage.jpg",
		"http://jameshudnall.com/aa/wp-content/uploads/2016/03/cav.jpg",
		"http://worldlandforms.com/landforms/wp-content/uploads/2015/03/Cave.jpg",
		"https://www.cowes.info/wp-content/uploads/2015/02/phillip-island-sandcastle-building.jpg",
		"http://fit2finish.com/wp-content/uploads/2015/02/kids-rolling-down-hill.jpg",
		"http://cdn.internationalculinarycenter.com/wp-content/uploads/2016/06/Bread-Baking-ICC-8.jpg",
		"http://previews.123rf.com/images/alexeys/alexeys1201/alexeys120100040/12074940-Peach-orchard-Stock-Photo-tree.jpg",
		"http://media.npr.org/assets/img/2013/09/24/chicago-rooftop-farm_wide-7cbe7ae709a8afc2f75650d26929ff43f82d1c3e-s900-c85.jpg",
		"http://www.steenoreilly.ie/userfiles/images/cows%20in%20field.jpg",
		"http://www.flipflopshops.com/images/FFS_Irvine_AngleShot.jpg",
		"http://www.invermania.com/file/2016/05/5_reasons_to_rent_a_commercial_dumpster.JPG",
		"http://images.summitpost.org/original/518160.jpg",
		"http://in5d.com/images/singing-plants.jpg",
		"https://financialtribune.com/sites/default/files/field/image/november/05_uk_-_170.jpg",
		"https://timedotcom.files.wordpress.com/2015/12/151221_em_buffetcosts.jpg?w=1100&quality=85",
		"http://otlablog.com/wp-content/uploads/2014/04/Pedestrians_Crossing_Bloor_and_Yonge.jpg",
		"http://road.cc/sites/default/files/styles/main_width/public/images/News/Bikes%20and%20pedestrians%20(CC%20licensed%20image%20by%20samsaundersleeds%3AFlickr).jpg?itok=xFKHy4Lf",
		"https://columbuszoo.org/Media/columbus-zoo-aquarium-2/my-barn---grahm-s-jones-columbus-zoo-and-aquarium.jpg?sfvrsn=0",
		"http://wwwassets.rand.org/content/rand/blog/2015/03/when-it-comes-to-police-community-relations-expect/jcr:content/par/teaser.aspectfit.0x1200.jpg/1428073950058.jpg",
		"http://publicitascontent.com/wp-content/uploads/2015/11/Photo-Delivery-Van-1024x540.jpg",
		"http://weinsteinau.com/wp-content/uploads/2013/11/04_Fire_Station_10_Bays_with_Fire_Truck.jpg",
		"http://images.puszta.com/szoborpark_budapest/leninek.jpg",
		"http://ichef.bbci.co.uk/news/976/mcs/media/images/82426000/jpg/_82426173_thinkstockphotos_knitting.jpg",
		"http://3161-presscdn-0-23.pagely.netdna-cdn.com/wp-content/uploads/2013/05/Shopping-Sale-Wufenpu-Taipei-Taiwan.jpg",
		"http://www.willudesign.com/wp-content/uploads/2011/08/NewWorkshopSlideshow4.jpg",
		"http://4.bp.blogspot.com/-RUWbERp2qrc/TZYf_BTLhGI/AAAAAAAAAAg/RxIw7mMByIQ/s1600/Street_Dance_4_by_metegursel.jpg",
		"http://demo.meroschool.com/GalleryImg/GalleryAlbumId2156319166.jpg",
		"http://mascotspot.com/wp-content/uploads/2015/10/2307fef8-a6b3-4613-8752-5c5f225a5e8d.jpg",
		"http://www.npenn.org/cms/lib/PA09000087/Centricity/ModuleInstance/18443/large/DSC_0051.jpg?rnd=0.422608239773013",
		"http://static3.businessinsider.com/image/56df1a5a9105841c008b4eae-1190-625/the-best-private-high-school-in-every-state.jpg",
		"http://www.bulgariamall.bg/newd/wp-content/uploads/2012/11/1.jpg",
		"https://www.dentistry.unc.edu/wp-content/uploads/2013/07/clinic.jpg?75834a",
		"http://www.danagrisol.com/wp-content/uploads/2014/09/Disc-plough-MASCHIO-2.jpg",
		"http://aspiretrust.org.uk/images/gallery/gl1/Woman-enjoying-gym-workout.jpg",
		"http://infobeautiful4.s3.amazonaws.com/2016/03/IMG_5107.jpg",
		"http://www.dlrgroup.com/media/3298/13-12102-00_marquee-01.jpg?width=1158",
		"https://static.dezeen.com/uploads/2016/11/forest-green-rovers-eco-park-football-soccer-stadium-architecture-news-zaha-hadid-architects-stroud-gloucestershire-england-uk_dezeen_hero.jpg",
		"http://yourshot.nationalgeographic.com/u/ss/fQYSUbVfts-T7pS2VP2wnKyN8wxywmXtY0-Fwsgxo7q8E5fwwW_owg0lIWsQa8upBBzqq7JWFBTqsygkKpyX/",
		"http://userscontent2.emaze.com/images/79aedbfd-6c65-4a84-bd3f-38c24e7d6c28/8789506b-df47-4d1e-ad47-d5cca2a81a65.jpg",
		"https://www.brisbanekids.com.au/wp-content/uploads/2012/02/Steam-Train-Day-Copy1.jpg",
		"http://www.town.ashland.va.us/ImageRepository/Document?documentID=954",
		"http://urbanclotheslines.com/content-image/SupaFold210%20Midnight.jpg",
		"http://slco.org/recreation/parks/images/Holm_Park_Playground.jpg",
		"http://www.your-baby-name.com/wp-content/uploads/2015/09/giant-ferris-wheel.jpg",
		"https://buzzanniebee.files.wordpress.com/2015/06/buffet-3.jpg",
		"https://farm3.static.flickr.com/2943/15347547291_b6317a9d2d_b.jpg",
		"http://static.asiawebdirect.com/m/phuket/portals/phuket-com/homepage/phuket-magazine/phuket-beaches-sun-loungers/allParagraphs/00/top10Set/01/image/surin-beach%20(1).jpg",
		"http://www.bocabeachclub.com/assets/img/waldorf-boca-beach-club-pool-1680x1080.jpg",
		"http://buildipedia.com/images/masterformat/Channels/In_Studio/Madrids_Four_Towers/Nicole_Jewell/Madrid_Four_Towers_02.jpg",
		"http://www.uplandnyc.com/img/slideshows/home/1200/1200-03.jpg",
		"http://www.manlycobblers.com.au/wp-content/uploads/2011/07/DSC_1017.jpg",
		"http://media.equityapartments.com/images/c_crop,x_0,y_0,w_1920,h_1080/c_fill,w_1920,h_1080/q_80/2518-36/centennial-tower-and-court-apartments-exterior.jpg",
		"http://www.cornell.edu/assets/images/academics/ad-white-library-1200x675.jpg",
		"http://danepieri-images.s3.amazonaws.com/images/large_20090422-cp-0126.jpg",
		"https://www.theproducersperspective.com/wp-content/uploads/2012/10/buffet.jpeg",
		"http://www.images.searchpointer.com/cargo/1753/4.jpg",
		"http://farm2.staticflickr.com/1403/1235067595_ac9c877ccd_b.jpg",
		"http://www3.hilton.com/resources/media/hi/PIECBHF/en_US/img/shared/full_page_image_gallery/main/hf_coastrmdouble_22_1270x560_FitToBoxSmallDimension_Center.jpg",
		"http://www.transitionsabroad.com/listings/travel/articles/images/cambodia-jungle-qok-playing-thro.jpg",
		"http://worldofhdr.com/wp-content/uploads/2011/03/SoHo-Alley.jpg",
		"http://www.californiabeaches.com/wp-content/uploads/2014/09/IMG_1283-Large-e1464827374555.jpg",
		"https://playbyphilippa.files.wordpress.com/2011/11/sporadic-hopscotch-003.jpg",
		"http://theahmedabadblog.com/wp-content/uploads/2013/08/603809_164294377068171_1522353495_n.jpg",
		"https://publicrealmdotorg1.files.wordpress.com/2014/12/tight-corner.jpg",
		"http://i.huffpost.com/gen/1459049/images/o-FRIENDS-EATING-facebook.jpg",
		"http://dfoyble.com/wp-content/uploads/2013/02/BROOKLYN_Laundromat_0291-423-7th-Avenue.jpg",
		"http://wac.450f.edgecastcdn.net/80450F/nj1015.com/files/2012/09/woman-jogger-630x504.jpg",
		"https://photos.smugmug.com/North-America/Mexico/Quintana-Roo/i-997RnTf/0/XL/coba-hidden-ruins-XL.jpg",
		"http://www.skipping-workshops.co.uk/wp-content/uploads/2015/08/Bisham-Abbey-photo1.jpg",
		"https://s-media-cache-ak0.pinimg.com/originals/0d/ed/d2/0dedd2e4554decf1afbc6c4c48a7fcb3.jpg",
		"http://2gn058m8vqz358inn1lanr2o.wpengine.netdna-cdn.com/wp-content/uploads/2015/02/bike-riding.jpg",
		"http://www.alkavadlo.com/wp-content/uploads/2010/07/060610-HawaiianPicnic-Trees-11.jpg",
		"http://www.indianmomsconnect.com/wp-content/uploads/2016/02/43962-highway.jpg",
		"http://kevinw.com/House/April%20Trip/back%20yard%20from%20street%20side.jpg",
		"http://s.wsj.net/public/resources/images/OD-BF433_WAITER_J_20150218164324.jpg",
		"http://lifenlesson.com/wp-content/uploads/2015/11/ruins-dreams-04.jpg",
		"http://www.hdrinc.com/sites/all/files/content/projects/images/1916-highway-404-hov-lanes-820.jpg",
		"http://c1038.r38.cf3.rackcdn.com/group1/building6788/media/broadway-tower-cotswolds-modf.jpg",
		"http://images.wisegeek.com/woman-riding-horse.jpg",
		"http://www.borgenmagazine.com/wp-content/uploads/2014/07/orphanage.jpg",
		"http://media.rightmove.co.uk/3k/2177/26594811/2177_53209657_IMG_00_0001.JPG",
		"https://media.timeout.com/images/102315419/image.jpg",
		"http://www.outerbanks.com/images/outerbanks/bonfire-63.jpg",
		"http://northcliffmelvilletimes.co.za/wp-content/uploads/sites/7/2016/11/P13-Mustangs-pitcher-John-Coetzer-Medium.jpg",
		"http://possector.com/wordpress/wp-content/uploads/2012/01/waiter0.jpg",
		"http://onmilwaukee.com/images/articles/ca/camping/camping_fullsize_story1.jpg?20080730123152",
		"http://www.pcccourier.com/wp-content/uploads/2016/10/feature_football-960x540-960x540.jpg",
		"https://www.raf.mod.uk/recruitment/media/1130/_fw01_raf_firefighter.jpg",
		"http://cdn.countrysidenetwork.com/wp-content/uploads/2015/10/iStock_000010954024_Medium.jpg",
		"https://dovemountain.com/wp-content/uploads/2013/07/gallery_golf_sports_club.jpg",
		"https://www.fleamarketinsiders.com/wp-content/uploads/2014/10/San-Francisco-Alemany-flea-market-Nathan-Guy.jpg",
		"http://www.aberlour.org.uk/assets/0000/3825/Volume_6_Page_18_top.jpg",
		"http://www.albert2.com/wp-content/uploads/2016/08/walking-vs-running-feature.jpg",
		"http://www.dartmouthrecreation.com/pics32/1024/BS/BSHYSMJFTMTNEVL.20120906173229.jpg",
		"http://www.shoutpromotions.co.uk/wp-content/uploads/2014/09/SingingWaiters-Waitresses.jpg",
		"http://s3.amazonaws.com/vnn-aws-sites/5672/files/2015/07/7D9A7449.jpg",
		"https://i0.wp.com/www.fleamarketinsiders.com/wp-content/uploads/2013/10/Waterloo-Flea-Market-copyrigh-waterloo.skynetblogs.be-005.jpg?resize=679%2C509",
		"http://www.hellobc.com/getmedia/1ec4bda7-6729-4088-a1df-435506be14c0/4-3544-Island-Lake-camping.jpg.aspx",
		"http://roa.h-cdn.co/assets/cm/14/47/980x551/546b0fa464875_-_bmwcrash-lg.jpg",
		"https://cbab.files.wordpress.com/2008/12/21st-birthday-013.jpg",
		"http://www.life2orphans.org/orphanage_3_odessa_files/orphanage_3_odessa.jpg",
		"https://smallbiztrends.com/wp-content/uploads/2016/06/shutterstock_378286648-850x476.jpg",
		"https://fitness-static.reebok.com/cdn-1d0cfc1be4f8d7c/PageFiles/704305/running_outdoors_reebok_main.jpg",
		"https://cdn4.benzinga.com/files/imagecache/1024x768xUP/images/story/2012/shutterstock_132468212.jpg",
		"https://img.warble-entertainment.com/1005/full_1346346124.jpg",
		"https://www.colourbox.com/preview/3251927-young-woman-kicks-pigeons-in-the-park.jpg",
		"http://www.loftconversionsnorth.co.uk/wp-content/uploads/2015/02/terrace-houses-aerials-sky-dish.jpg",
		"https://yesbuts.files.wordpress.com/2008/09/7-img_1225.jpg",
		"http://www.albert2.com/wp-content/uploads/2016/08/downhill-running.jpg",
		"https://www.angieslist.com/files/styles/widescreen_large/public/dream_basketball_court.jpg?itok=su7IpXFL",
		"https://i0.wp.com/www.fleamarketinsiders.com/wp-content/uploads/2015/07/Plac-Targowy-Flea-Market-Krakow-copyright-Travel-Junkies-002.jpg?resize=1020%2C676",
		"https://fthmb.tqn.com/yRJqGpn_k47Cw_3ibKdxHTBnQHM=/768x0/filters:no_upscale()/about/GettyImages-200023671-001-571fc1ab5f9b58857d46c7b6.jpg",
		"http://www.athletico.com/blog2/wp-content/uploads/2012/04/Runners.jpg",
		"http://dconheels.com/wp-content/uploads/2015/08/kids-safety1-iStockPhoto.jpg",
		"http://68.media.tumblr.com/832959dee7418cf92a521baa28d9ceb1/tumblr_naifuzrV2a1rpytsuo2_1280.jpg",
		"http://www.wheatlandexpress.com/wp-content/uploads/2015/04/bus-outreach.jpg",
		"http://thetaverngrille.com/images/jsvisionary/tavern_grille_exterior_night.jpg",
		"http://www.ngautomatics.co.uk/wp-content/uploads/2013/10/Kennington-Park-Post-Office-Shop-Front-Door.jpg",
		"https://goingplaid.files.wordpress.com/2013/03/couplebench2.jpg",
		"http://www.crengland.com/sites/default/files/assets/img_0610.jpg",
		"http://www.wpbmagazine.com/wp-content/uploads/2015/05/Clock-at-the-entrance-of-Worth-Avenue-in-Palm-Beach-Island1.jpg",
		"http://hyhoi.com/wp-content/uploads/2016/02/the-gibson-cocktail-bar-old-street-london-nightjar-speakeasy-exterior-2.jpg",
		"http://www.34ddm.co.uk/Poolside/slides/Poolside%20(2).jpg",
		"http://massmoca.org/wp-content/uploads/2015/06/Clocktower_Full.jpg",
		"http://news.stanford.edu/news/2015/may/images/15261-fountains_news.jpg",
		"https://banking.mt.gov/Portals/58/Banks/Bank%20Pictures/Rocky%20Mountain%20Bank.jpg",
		"https://www.crownperth.com.au/getmedia/1f51e980-5162-4dc1-84d2-9b041b709645/150708-Perth-Hotels-CrownMetropol-Poolside-974x676-02.jpg.aspx?width=974&height=676&ext=.jpg",
		"http://www.offthegridnews.com/wp-content/uploads/2014/09/goats-pheasantviewgoatsoap.jpg",
		"http://rbk.h-cdn.co/assets/cm/14/49/547eeef7d1fdd_-_mom-moment-multiple-blessings-family-xlsynd.jpg",
		"https://static1.squarespace.com/static/5605eb16e4b0c937d1665d78/5664dbb4e4b0665ae8f78ed6/5664dd2fe4b043ef27925a2a/1449450833669/SGF15+-+Tavern+On+Kruse_1004.jpg",
		"http://www.zionfriedheim.org/images/gifs/zion%20church%20new.jpg",
		"http://www.educationsitescatalog.com/news/gallery/be-an-active-mother-so-your-children-are-active-too-pictures/active-mom.jpg",
		"http://media.bizj.us/view/img/4626501/first-citizens-bank-1*1200xx4000-2250-0-209.jpg",
		"http://7214-presscdn-0-0.pagely.netdna-cdn.com/wp-content/uploads/2013/09/small-town-church.jpg",
		"http://www.saint-petersburg.com/images/peterhof/fountains-peterhof/menager-fountain-in-peterhof.jpg",
		"http://www.hiddencitysecrets.com.au/wp-content/uploads/2016/05/laika-bar-st-kilda-bars-melbourne-waterfront-best-top-good-cocktail-live-music-001.jpg",
		"https://timedotcom.files.wordpress.com/2015/06/church.jpg?quality=85&w=1100",
		"http://hugoswebdesign.com/wp-content/uploads/2016/03/backyard-bar-b-q-outdoor-barbeque.jpg",
		"http://www.designboom.com/weblog/images/images_2/lauren/mederu/crfn05.jpg",
		"http://www.the-peak.ca/wp-content/uploads/2014/04/young-people-in-club-or-bar-drinking-beer-out-of-a-beer-bottle-and-have-fun.jpg",
		"http://cdn-media-1.lifehack.org/wp-content/files/2015/03/Things-About-Homeless-People.jpg",
		"http://childrensing.org/wp-content/uploads/2012/06/IMG_9368.jpg",
		"http://america.aljazeera.com/content/ajam/articles/2015/3/2/homeless-bill-rights/jcr:content/headlineImage.adapt.1460.high.homeless_sleeping_030215.1425370912825.jpg",
		"http://www.wsp-pb.com/Globaln/WSP_Group/Chenab-bridge-710.jpg",
		"http://www.geoffs-garden-ornaments.co.uk/images/6-foot-3-tiered-fountain-1.jpg",
		"http://www.aestheticmanagement.com/wp-content/uploads/2009/02/performing-brouhaha.jpg",
		"http://www.welchsautomotive.com/images/deland-auto-repair.jpg",
		"http://www.stopsmoking.news/wp-content/uploads/sites/27/2016/01/high-school-smoker-21.jpg",
		"http://www.voiceofsandiego.org/wp-content/uploads/2016/04/Homeless_2.jpg",
		"http://www.mcb.wa.gov.au/images/default-source/home-page-feature-images/slider2.jpg?sfvrsn=6",
		"http://iae.univ-poitiers.fr/sites/IAE/files/images/equipe-comunity.jpg",
		"http://www.bugout.news/wp-content/uploads/sites/45/2016/02/Crowd-People-Walking-Business-Blurry.jpg",
		"https://upload.wikimedia.org/wikipedia/en/a/a8/Airborne_Cemetery.jpg",
		"http://www.saint-petersburg.com/images/cemeteries/alexander-nevsky-monastery-and-cemetery/communist-section-at-the-cemetery-of-the-alexander-nevsky-monastery-in-st-petersburg.jpg",
		"http://womenspost.ca/wp-content/uploads/2016/09/central-park-535645_960_720.jpg",
		"https://accessgenealogycom-39b9.kxcdn.com/wp-content/uploads/2012/10/Daubenspeck-Cemetery-Hamilton-County-Indiana.jpg",
		"http://www.regentstreetonline.com/UploadedImages/0044f08b-52fb-4a08-bb0f-68620ca02a40.jpg",
		"http://media2.govtech.com/images/complete-streets.jpg",
		"https://i2.wp.com/www.pps.org/wp-content/uploads/2014/03/streets-as-places-2.jpg",
		"http://www.sommerhus-kerteminde-langoe.dk/wp-content/uploads/2015/10/22-1200x628.jpg",
		"https://lottielandgirl.files.wordpress.com/2013/08/beautfiul-huses-in-castleton.jpg?w=700",
		"http://files.parapidbridges.com/sitedocs/images/bridgeupdate-12491.jpg",
		"https://drinkwise.org.au/wp-content/uploads/2.05_Binge_drinking.jpg",
		"https://coxrare.files.wordpress.com/2014/08/smoker.jpg?w=1200&h=627&crop=1",
		"http://funinsingapore.com/wp-content/uploads/2015/06/Singapore_Botanic_Gardens.jpg",
		"http://singapore.coconuts.co/sites/singapore.coconuts.co/files/styles/body_674w/public/inline/images/altimate_halloween-20.jpg?itok=D5juyrKd",
		"http://cdn-image.travelandleisure.com/sites/default/files/styles/tnl_redesign_article_landing_page/public/1444853128/SECRETSTROME1015-002.jpg?itok=6ive5BhK",
		"http://www.hollywoodtoday.net/wp-content/uploads/2016/10/house-painters-6.jpg",
		"https://f.nordiskemedier.dk/2l8okrp0akh5vuib.jpg",
		"http://cdn.home-designing.com/wp-content/uploads/2010/11/Small-Cottage-House-in-grassy-fields.jpg",
		"https://media-cdn.tripadvisor.com/media/photo-o/02/74/02/68/coliza-cottage.jpg",
		"http://www.sanfranciscodailyphoto.com/images/2007112319113631_10-feb-2006.small.jpg",
		"http://www1.toronto.ca/parks/img/798/1.jpg",
		"http://www.surrey.ca/images/cos-master/pageImages/West_Newton_Community_Park.jpg"		
	];

	return urls[imgindex];
}