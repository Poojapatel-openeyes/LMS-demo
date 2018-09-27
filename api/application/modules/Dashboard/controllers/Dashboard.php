<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Dashboard_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->Dashboard_model->getlist_Setting();
		
		echo json_encode($data);
				
	}
	
	
}
