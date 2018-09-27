<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Department extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Department_model');
	}
	
	
	public function addDepartment()
	{
		$post_department = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_department) 
			{
				if($post_department['DepartmentId']>0)
				{
					$result = $this->Department_model->edit_department($post_department);
					if($result)
					{
						echo json_encode($post_department);	
					}	
				}
				else
				{
					
					$result = $this->Department_model->add_department($post_department); 
					if($result)
					{
						echo json_encode($post_department);	
					}	

				}
					
			}
	}
	
	
	//Delete UserList
	public function delete($department_id = NULL) 
	{

		if(!empty($department_id)) {

			$result = $this->Department_model->delete_department($department_id);			
			if($result) {
				echo json_encode("Delete successfully");	
			}	
			
		} 
			
	}
	
	//get userId edit
	public function getById($department_id=null)
	{	
		
		if(!empty($department_id))
		{
			$data=[];
			$data=$this->Department_model->get_departmentdata($department_id);
			echo json_encode($data);
		}
	}
	

	public function getAll()
	{
		//$data="";
		
		$data=$this->Department_model->getlist_department();
		
		echo json_encode($data);
	}
	
	
}
