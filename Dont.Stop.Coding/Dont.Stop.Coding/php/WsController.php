<?php

namespace App\Controller;

class WsController extends AppController
{
    public function index()
    {
		$url = "http://www.cbn.com/cbnnews/world/feed/";
		return $this->response->withType("application/json")->withStringBody(file_get_contents($url));	
        //$this->set(compact('articles'));
    }
}