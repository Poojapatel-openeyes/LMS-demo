<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Setting extends CI_Controller {


	public function __construct() {
	
		parent::__construct();
		
		$this->load->model('Setting_model');
		
	}
	
	public function getAll() {
		
		//$data="";
		
		$data=$this->Setting_model->getlist_Setting();
		
		echo json_encode($data);
				
	}
	
	
	public function add() {
		
		
		$post_Setting = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_Setting) {
			if($post_Setting['SettingId'] > 0){
				$result = $this->Setting_model->edit_Setting($post_Setting);
				if($result) {
					echo json_encode($post_Setting);	
				}	
			} else {
				$result = $this->Setting_model->add_Setting($post_Setting);
				if($result) {
					echo json_encode($post_Setting);	
				}	
			}							
		}
		
	}
	
	public function getById($Setting_Id = NULL) {
		
		if (!empty($Setting_Id)) {
			$data = [];		
			$data = $this->Setting_model->get_Settingdata($Setting_Id);
			echo json_encode($data);			
		}
	}	
	
	
	public function delete() {
		$post_Setting = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_Setting) {
			if($post_Setting['id'] > 0){
				$result = $this->Setting_model->delete_Setting($post_Setting);
				if($result) {
					
					echo json_encode("Delete successfully");
				}
				}
		
			
		} 
			
	}


	// public function delete() {
	// 	$post_Setting = json_decode(trim(file_get_contents('php://input')), true);		

	// 	if ($post_Setting) {
	// 		if($post_Setting['id'] > 0){
	// 			$result = $this->Setting_model->delete_Setting($post_Setting);
	// 			if($result) {
					
	// 				echo json_encode("Delete successfully");
	// 			}
	// 			}
		
			
	// 	} 
			
	// }
	
}
