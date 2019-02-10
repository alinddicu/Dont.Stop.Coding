<?php

namespace App\Controller;

class RssTestController extends AppController
{
    public function index()
    {
		$feed = urldecode($_GET['feed']);
		$fileContents = file_get_contents($feed);
		$xml = simplexml_load_string($fileContents, 'SimpleXMLElement', LIBXML_NOCDATA);
		
		if (strpos($fileContents, 'media:thumbnail')) {
			$namespaces = $xml->getNamespaces(true); // get namespaces

			$items = array();
			foreach ($xml->channel->item as $item) {
			  $thumbnail_url = trim((string) $item->children($namespaces['media'])->thumbnail->attributes()->url);
			  $item->thumbnail = $thumbnail_url;
			}
		}
		
		$json = json_encode($xml);
		return $this->response->withType("application/json")->withStringBody($json);	
    }
}