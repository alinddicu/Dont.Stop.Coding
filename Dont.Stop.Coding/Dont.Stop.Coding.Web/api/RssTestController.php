<?php

namespace App\Controller;

class RssTestController extends AppController
{
    public function index()
    {
		$feed = urldecode($_GET['feed']);
		$fileContents = file_get_contents($feed);
		$json = json_encode(simplexml_load_string($fileContents, 'SimpleXMLElement', LIBXML_NOCDATA));
		return $this->response->withType("application/json")->withStringBody($json);	
    }
}