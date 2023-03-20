function rawHtmlResponse(html) {
	const init = {
	  headers: {
		'content-type': 'text/html;charset=UTF-8',
	  },
	};
	return new Response(html, init);
  }
  
  /**
   * readRequestBody reads in the incoming request body
   * Use await readRequestBody(..) in an async function to get the string
   * @param {Request} request the incoming request to read from
   */
  async function readRequestBody(request) {
	const { headers } = request;
	const contentType = headers.get('content-type') || '';
  
	if (contentType.includes('application/json')) {
	  return JSON.stringify(await request.json());
	} else if (contentType.includes('application/text')) {
	  return request.text();
	} else if (contentType.includes('text/html')) {
	  return request.text();
	} else if (contentType.includes('form')) {
	  const formData = await request.formData();
	  const body = {};
	  for (const entry of formData.entries()) {
		body[entry[0]] = entry[1];
	  }
	  return JSON.stringify(body);
	} else {
	  // Perhaps some other type of data was submitted in the form
	  // like an image, or some other binary data.
	  return 'a file';
	}
  }
  
  const someForm = `
	<!DOCTYPE html>
	<html>
	<body>
	<h1>Hello World</h1>
	<p>This is all generated using a Worker</p>
	<form action="/demos/requests" method="post">
	  <div>
		<label for="say">What  do you want to say?</label>
		<input name="say" id="say" value="Hi">
	  </div>
	  <div>
		<label for="to">To who?</label>
		<input name="to" id="to" value="Mom">
	  </div>
	  <div>
		<button>Send my greetings</button>
	  </div>
	</form>
	</body>
	</html>
	`;
  
  async function handleRequest(request) {
	var reqBody = await readRequestBody(request);
	console.log(reqBody)
	var object = JSON.parse(reqBody)
	console.log('yay')
	console.log(object.url)
	const url = object.url.trim()
	console.log(url)
	await fetch(url)
	.then((value1)=> {
		return value1
	}).then((value2)=> {
		console.log(value2.url)
		var url = value2.url
		console.log(url)
		url = url.toString()
		console.log(url)
		if (url.endsWith('&ucbcb=1') || url.endsWith('?ucbcb=1'))
		{
			url = url.slice(0,-8)
			console.log('android fix')
		}
		else if (url.endsWith('/'))
		{
			url = url.slice(0,-1)
			console.log('/ at end fixed')
		}
 
		 var {pathname,host,hash,search} = new URL(url)
		 console.log(url)
		 console.log(host)
		 console.log(pathname)
	   
		
		 var newUrl = pathname
 
		 const array = newUrl.split('/')
		 console.log(array)
		 if (host==='www.google.com')
		 {
			 const path = pathname + search + hash
			 console.log(path)
		 
   
			 if (path.startsWith('/maps?daddr=') || path.startsWith('/maps?saddr=') )
			 {
				 var address = path.split('=')[1]
				 var link = 'om://search?query=' + address
				 const regex = /\+/ig
				 link = link.replace(regex,"%20")
				 console.log(link)
				 reqBody = link
			 }
			 else if(path.startsWith('/maps?q=loc:'))
			 {
				 var coord = path.split(':')[1]
				 var link = 'geo:' + coord
				 console.log(link)
				 reqBody = link
			 }
			 else if(path.startsWith('/maps?ll='))
			 {
				 var coord = path.split('=')[1]
				 console.log(coord)
				 var link = 'geo:' + coord
				 console.log(link)
				 reqBody = link
			 }
			 else if(path.startsWith('/maps?q=') || (path.startsWith('/search?q=')) || (path.startsWith('/maps/place/?q')))
			 {
				 var address = path.split('=')[1]
				 var link = 'om://search?query=' + address
				 const regex = /\+/ig
				 link = link.replace(regex,"%20")
				 console.log(link)
				 reqBody = link
			 }
	 
			 else if (path.startsWith('/maps/search/?q='))
			 {
				 var address =  path.split('=')
				 var link = 'om://search?query=' + address[address.length-1]
				 console.log(link)
				 const regex = /\+/ig
				 link = link.replace(regex,"%20")
				 reqBody = link
			 }
			 else if (path.startsWith('/maps/search/') )
			 {
				 var address = path.split('/')
				 if (address[address.length-1].charAt(0)==='@')
				 {
					 address[address.length-1] = address[address.length-1].substring(1)
					 console.log(address[address.length-1])
				 }
				
				 var link = 'om://search?query=' + address[address.length-1]
				 console.log(link)
				 const regex = /\+/ig
				 link = link.replace(regex,"%20")
				 reqBody = link
			 }
			 else if(path.startsWith('/maps/dir/'))
			 {
				 var address = path.split('/')
				 console.log(address)
				 var link = 'om://search?query=' + address[address.length-1]
				 console.log(link)
				 const regex = /\+/ig
				 link = link.replace(regex,"%20")
				 reqBody = link
			 }
			 // else if (path.startsWith('/maps/place/') && array[4].charAt(0)==='@')
			 // {
			 //     array[4] =array[4].substring(1)
			 //     array[3] = array[4].split(',')[0] + ',' + array[4].split(',')[1]
			 //     var link = 'geo:' + array[3]
			 //     console.log(link)
			 //     res.redirect(link) 
			 // }
			 // else if (path.startsWith('/maps/place/'))
			 // {
			 //     var link = 'om://search?query=' + array[3]
			 //     console.log(link)
			 //     const regex = /\+/ig
			 //     link = link.replace(regex,"%20")
			 //     res.redirect(link)
			 // }
			 else if (path.startsWith('/maps/place'))
			 {
				 try 
				 {
					 if (array[4].charAt(0)==='@')
					 {
						 array[4] =array[4].substring(1)
							 array[3] = array[4].split(',')[0] + ',' + array[4].split(',')[1]
							 var link = 'geo:' + array[3]
							 console.log(link)
							 reqBody = link
					 }
					 else 
					 {
						 var link = 'om://search?query=' + array[3]
						 console.log(link)
						 const regex = /\+/ig
						 link = link.replace(regex,"%20")
						 reqBody = link
					 }
				 }
				 catch
				 {
					 var link = 'om://search?query=' + array[3]
					 console.log(link)
					 const regex = /\+/ig
					 link = link.replace(regex,"%20")
					 reqBody = link
				 }
			 }
 
 
			 else
			 {
				 try{
					 console.log(path.split('@'))
					 const coord = path.split('@')
					 // const array = pathname.split('@')[1].split(',')
					 // const latitude = array[0]
					 // const longitude = array[1]
					 if(coord.length===1)
					 {
						 throw false
					 }
					 const geo = new URL('geo:' + coord[coord.length-1])
			   
					 reqBody = geo
				 
				 }
				 catch
				 {
					 console.log('here')
		 
					 var om = 'om://search?query=' + array[array.length-2]
			  
					 const regex = /\+/ig
					 om = om.replace(regex,"%20")
					 console.log(om)
		 
					 reqBody = om
				 }
			 }
			 
		 }
		 else if(host==='www.openstreetmap.org')
		 {
			
				 var arr = hash.split('/')
				 const latitude = arr[1]
				 const longitude = arr[2]
				 const geo = new URL('geo:' + latitude + ',' + longitude)
				 reqBody = geo
		  
		 }
		 else if (host==='captcha.2gis.ru')
		 {
			 const array = search.split('%2F')[7].split('%2C')
			 var latitude = array[0]
			 var longitude = array[1]
			 //   console.log(latitude,longitude)
			 const geo = new URL('geo:' + latitude + ',' + longitude)
			 //   console.log(geo.href)
			 reqBody = geo
		 }
	})
	const retBody = `${reqBody}`;
	return new Response(retBody);
  }
  
  addEventListener('fetch', event => {
	const { request } = event;
	const { url } = request;
  
	if (request.method === 'POST') {
	  return event.respondWith(handleRequest(request));
	} else if (request.method === 'GET') {
	  return event.respondWith(new Response(`The request was a GET`));
	}
  });