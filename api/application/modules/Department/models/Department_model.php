<?php

class Department_model extends CI_Model
{
	
	public function add_department($post_department)
	{	
		
		if($post_department)
		{
			if($post_department['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			 
			$department_data=array(
				"DepartmentId"=>trim($post_department['DepartmentId']),
				"DepartmentName"=>trim($post_department['DepartmentName']),
				"IsActive"=>$IsActive,
				'CreatedOn' => date('y-m-d H:i:s'),
				"CreatedBy" =>1,
				"UpdatedBy" =>1
			);	
				
				$res=$this->db->insert('tblmstdepartment',$department_data);
				if($res)
				{
					return true;
				}
				else
				{
					return false;
				}
		}
		else
		{
				return false;
		}
	}
	
	//list project status
	public function getlist_department()
	{
		$this->db->select('*');
	//	$this->db->order_by('DepartmentName','asc');
		$result=$this->db->get('tblmstdepartment');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
		
	
	//Delete UserList
	public function delete_department($department_id) 
	{
	
		if($department_id) 
		{
			
			$this->db->where('DepartmentId',$department_id);
			$res = $this->db->delete('tblmstdepartment');
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} 
		else 
		{
			return false;
		}
		
	}
	
	//Edit ProjectList
	 public function edit_department($post_department) {
		
		if($post_department) 
		{		
			if($post_department['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}

				$department_data = array(
				//"ProjectStatusId"=>$post_department['ProjectStatusId'],
				"DepartmentId"=>$post_department['DepartmentId'],
				"DepartmentName"=>$post_department['DepartmentName'],
				"IsActive"=>$IsActive,
				"UpdatedBy" =>1,
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			$this->db->where('DepartmentId',trim($post_department['DepartmentId']));
			$res = $this->db->update('tblmstdepartment',$department_data);
			
			if($res) 
			{
				return true;
			} else
				{
				 return false;
			    }
		}
		else 
		{
			return false;
		}	
	
	}
	
	
	public function get_departmentdata($department_id=Null)
	{
	  if($department_id)
	  {
		 $this->db->select('*');
		 $this->db->where('DepartmentId',$department_id);
		 $result=$this->db->get('tblmstdepartment');
		 $department_data = array();
		 foreach($result->result() as $row) {
			 $department_data = $row;
		 }
		 return $department_data;
		 
			 } else {
		 return false;
	 	}
	}
	
	
	
	
}