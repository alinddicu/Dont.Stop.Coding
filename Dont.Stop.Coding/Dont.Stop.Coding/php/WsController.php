<?php

namespace App\Controller;

class WsController extends AppController
{
    public function index()
    {
		$url = urldecode($_GET['url']);
		$fileContents = file_get_contents($url);
		$json = json_encode(simplexml_load_string($fileContents, 'SimpleXMLElement', LIBXML_NOCDATA));
		return $this->response->withType("application/json")->withStringBody($json);	
    }
}