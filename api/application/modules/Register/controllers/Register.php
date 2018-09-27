<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Register extends CI_Controller {

	public function __construct()
	{ 
		parent::__construct();
		$this->load->model('Register_model');
	}
	
	public function addUser()
	{  
		$post_user = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_user) 
			{
				if($post_user['UserId']>0)
				{
					$result = $this->Register_model->edit_user($post_user);
					if($result)
					{
						echo json_encode($post_user);	
					}	
				}
				// else
				// {
					
				// 	$result = $this->Register_model->add_user($post_user); 
			
				// 	if($result)
				// 	{
				// 		echo json_encode($post_user); 
						
				// 	}	
				//  }
					
			}
	}


	public function getAllUserList()
	{
			$data=$this->Register_model->getlist_user();
			echo json_encode($data);
	}


	//Delete UserList
	
	public function deleteUser() {
		$post_user = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_user)
		 {
			if($post_user['id'] > 0){
				$result = $this->Register_model->delete_user($post_user);
				if($result) {	
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}


	//get userId edit
	public function getById($User_Id=null)
	{	
		if(!empty($User_Id))
		{
			$data=[];
			$data=$this->Register_model->get_userdata($User_Id);
			echo json_encode($data);
		}
	}


	public function getAllDefaultData()
	{
		//$data="";
		$data['company']=$this->Register_model->getlist_company();
		$data['department']=$this->Register_model->getlist_department();
		$data['role']=$this->Register_model->getlist_userrole();
		$data['country']=$this->Register_model->getlist_country();
		$data['state']=$this->Register_model->getlist_state();
		echo json_encode($data);
	}


	
}
