<?php

class Userinvite_model extends CI_Model
{
	
	

	public function add_user($post_user)
	{	
		if($post_user)
		{
			$this->db->select('UserId');
			$this->db->where('EmailAddress',trim($post_user['EmailAddress']));
			$query=$this->db->get('tbluser');
			if($query->num_rows() > 0){
				return false;
			}
			
			$user_data=array(
			"UserId"=>trim($post_user['UserId']),
			"RoleId"=>trim($post_user['RoleId']),
			"DepartmentId"=>trim($post_user['DepartmentId']),
			"CompanyId"=>trim($post_user['CompanyId']),
			"EmailAddress"=>trim($post_user['EmailAddress']),
			"Status"=>1,
			"Code"=>trim($post_user['Code']),
			"CreatedBy"=>1,
			"CreatedOn"=>date('y-m-d H:i:s')
			//"UpdatedBy"=>1
				
			);	
				
				$res=$this->db->insert('tbluser',$user_data);
				if($res)
				{
					$userId = $this->db->insert_id();
					if($post_user['CompanyId']==0)
					{
					$user1_data=array(
					//	"CompanyId" => $post_user['CompanyId'],
						"Name" => $post_user['Name'],
						"ParentId" => $post_user['ParentId'],
						"EmailAddressCom" => $post_user['EmailAddressCom'],
						"Address" => $post_user['Address'],
						"IndustryId" => $post_user['IndustryId'],
						"Website" => $post_user['Website'],
						"PhoneNo" => $post_user['PhoneNo'],
						"CreatedBy"=>1,
						"CreatedOn"=>date('y-m-d H:i:s')
						
							
						);	
							
							$res1=$this->db->insert('tblcompany',$user1_data);
					

							if($res1){
								return $userId;
							}
							else
							{
								return false;
							}
						}
						else
						{
							return $userId;
						}
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


	public function getlist_user()
	{
			$this->db->select('*');
			$this->db->order_by('FirstName','asc');
			$result = $this->db->get('tbluser');

			$res=array();
			if($result->result())
			{
				$res=$result->result();
			}
			return $res;
	
	}


	public function getlist_inviteduser()
	{
			
			$this->db->select('us.UserId,us.RoleId,us.CompanyId,us.FirstName,us.LastName,us.EmailAddress,us.PhoneNumber,us.Status,cp.Name,dep.DepartmentName');
			$this->db->join('tblcompany cp','cp.CompanyId = us.CompanyId', 'left');
			$this->db->join('tblmstdepartment dep','dep.DepartmentId = us.DepartmentId', 'left');
			$this->db->order_by('us.UserId','asc');
			//$this->db->where('us.RoleId is NOT NULL');
			$this->db->where('(us.Status = 2 OR us.Status = 1) AND us.RoleId is NOT NULL');
		//	$this->db->where('us.Status',2);
			$result = $this->db->get('tbluser us');
				$res=array();
				if($result->result())
				{
					$res=$result->result();
				}
				return $res;
	
	}

	

	public function delete_Invitation($post_revoke) {
	
		if($post_revoke) {
			
				$user_data = array(
					'Status' => 0,
					'code' =>0,
					'UpdatedBy' =>1,
					'UpdatedOn' => date('y-m-d H:i:s')
				
				);
				
				$this->db->where('UserId',$post_revoke['id']);
				$res = $this->db->update('tbluser',$user_data);
				
				if($res) {

					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}	
			
		}


		public function ReInvite_Invitation($post_user) {
	
			if($post_user) {
				
					$user_data = array(
						'Status' => 2,
						'code' =>trim($post_user['Code']),
						'UpdatedBy' => 1,
						'UpdatedOn' => date('y-m-d H:i:s')
						
					
					);
					
					$this->db->where('UserId',$post_user['UserId']);
					$res = $this->db->update('tbluser',$user_data);
					
					return true;
		
				}
				else 
				{
					return false;
				}	
				
				
			}
			


	
	//Edit UserList
	 public function edit_user($post_user) 
	 {
		if($post_user) 
		{
			if($post_user['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
				$user_data = array(
				"UserId"=>trim($post_user['UserId']),
				"RoleId"=>trim($post_user['RoleId']),
				"CompanyId"=>trim($post_user['CompanyId']),
				"DepartmentId"=>trim($post_user['DepartmentId']),
				"CountryId"=>trim($post_user['CountryId']),
				"StateId"=>trim($post_user['StateId']),
				"FirstName"=>trim($post_user['FirstName']),
				"LastName"=>trim($post_user['LastName']),
				 "Title"=>trim($post_user['Title']),
				"EmailAddress"=>trim($post_user['EmailAddress']),
				"Password"=>trim($post_user['Password']),
				"Address1"=>trim($post_user['Address1']),
				"Address2"=>trim($post_user['Address2']),
				"PhoneNumber"=>trim($post_user['PhoneNumber']),
				"PhoneNumberL"=>trim($post_user['PhoneNumberL']),
				"IsActive"=>$IsActive,
				"UpdatedBy"=>1,
				"UpdatedOn"=> date('y-m-d H:i:s')
			  );
			
		
			$this->db->where('UserId',trim($post_user['UserId']));
			$res = $this->db->update('tbluser',$user_data);
		
		}
		else 
		{
			return false;
		}	
	
	}

	function getlist_allcompany()
	{
		
		$this->db->select('CompanyId,Name');
		$this->db->where('ParentId="0"');
		$result = $this->db->get('tblcompany');
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	function getlist_industry()
	{

		$this->db->select('*');
		$result=$this->db->get('tblmstindustry');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;

	}
	
	function getlist_company()
	{
		$this->db->select('*');
		$result=$this->db->get('tblcompany');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}

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


	//list user role
	public function getlist_userrole()
	{
		$this->db->select('RoleId,RoleName');
		$this->db->where('RoleId!=','5');
		$this->db->where('RoleId!=','1');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	
	
}