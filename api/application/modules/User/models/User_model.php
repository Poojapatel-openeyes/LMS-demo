<?php

class User_model extends CI_Model
{
	
	public function getStateList($country_id = NULL) {
		
		if($country_id) {
			
			$this->db->select('StateId,StateName');
			$this->db->where('CountryId',$country_id);
			$this->db->order_by('StateName','asc');
			$this->db->where('IsActive=',1);
			$result = $this->db->get('tblmststate');
			
			$res = array();
			if($result->result()) {
				$res = $result->result();
			}
			return $res;
			
		} else {
			return false;
		}
	}
	
	public function add_user($post_user)
	{	
		if($post_user)
		{
			
			$user_data=array(
			"RoleId"=>trim($post_user['RoleId']),
			"CompanyId"=>trim($post_user['CompanyId']),
			"DepartmentId"=>trim($post_user['DepartmentId']),
			"CountryId"=>trim($post_user['CountryId']),
			"StateId"=>trim($post_user['StateId']),
			"FirstName"=>trim($post_user['FirstName']),
			"LastName"=>trim($post_user['LastName']),
			"Title"=>trim($post_user['Title']),
			"EmailAddress"=>trim($post_user['EmailAddress']),
			"Password"=>md5($post_user['Password']),
			"Address1"=>trim($post_user['Address1']),
			"Address2"=>trim($post_user['Address2']),
			"PhoneNumber"=>trim($post_user['PhoneNumber']),
			"PhoneNumberL"=>trim($post_user['PhoneNumberL']),

			//"IsActive"=>$IsActive,
			"CreatedBy"=>1,
			"CreatedOn"=>date('y-m-d H:i:s')
			//"UpdatedBy"=>1
				
			);	
				
				$res=$this->db->insert('tbluser',$user_data);
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
	

	public function reset_passlink($post_user) 
	{
		if($post_user)
		{
			
				$this->db->select('UserId,EmailAddress,Code');				
				$this->db->where('UserId',trim($post_user['UserId']));
				$this->db->where('EmailAddress',trim($post_user['EmailAddress']));
				$this->db->where('Code',trim($post_user['Code']));
				
				$this->db->limit(1);
				$this->db->from('tbluser');
			    $query= $this->db->get();
			
				
				if ($query->num_rows() == 1) 
				{
					$user_data = array(
						//'Status' =>0,
						'Code' =>'',
						
						//'CreatedOn' => date('y-m-d H:i:s'),
						'UpdatedOn' => date('y-m-d H:i:s')
						);
				
				
			
					$this->db->where('UserId',trim($post_user['UserId']));
					$this->db->where('Code',trim($post_user['Code']));
					$res = $this->db->update('tbluser',$user_data);
					if($res)
					{
					    $pass = array();
						foreach($query->result() as $row) 
						{
							$pass = $row;
						}
						return $pass;
					}else
					{
						return false;
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
	
	
	public function reset_passlink2($post_user) 
	{
		if($post_user)
		{
			
				$this->db->select('UserId,Code');				
				$this->db->where('UserId',trim($post_user['UserId']));
				//$this->db->where('EmailAddress',$post_pass['EmailAddress']);
				$this->db->where('Code',trim($post_user['Code']));
				$this->db->limit(1);
				$this->db->from('tbluser');
			    $query= $this->db->get();
			
				
				if ($query->num_rows() == 1) 
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
	
	
	
	
	
	//Delete UserList
	public function delete_user($post_user) 
	{
	
		if($post_user) 
		{
			
			$this->db->where('UserId',$post_user['id']);
			$res = $this->db->delete('tbluser');
			
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
	 public function edit_user($post_user) {
		
		if($post_user) 
		{
				$user_data = array(
				"UserId"=>trim($post_user['UserId']),
				"RoleId"=>trim($post_user['RoleId']),
				"CompanyId"=>trim($post_user['CompanyId']),
				"DepartmentId"=>trim($post_user['DepartmentId']),
				//"CountryId"=>trim($post_user['CountryId']),
				//"StateId"=>trim($post_user['StateId']),
				"FirstName"=>trim($post_user['FirstName']),
				"LastName"=>trim($post_user['LastName']),
				"Title"=>trim($post_user['Title']),
				"EmailAddress"=>trim($post_user['EmailAddress']),
				"Password"=>md5($post_user['Password']),
				//"Address1"=>trim($post_user['Address1']),
				//"Address2"=>trim($post_user['Address2']),
				"PhoneNumber"=>trim($post_user['PhoneNumber']),
				//"PhoneNumberL"=>trim($post_user['PhoneNumberL']),
			//	"PhoneNumberL"=>trim($post_user['PhoneNumberL']),
				"Status"=>3,
				"Code"=>'',
					//"IsActive"=>$IsActive,
				'UpdatedBy' =>1,
				'UpdatedOn' => date('y-m-d H:i:s')
			);
			
			
			
			
			$this->db->where('UserId',trim($post_user['UserId']));
			$res = $this->db->update('tbluser',$user_data);
			
			return true;
		
		}
		else 
		{
			return false;
		}	
	}
	
	
	public function get_userdata($user_id=Null)
	{
	  if($user_id)
	  {

		$this->db->select('user.UserId,user.FirstName,user.LastName,user.Title,user.EmailAddress,user.Password,user.Address1,user.Address2,user.PhoneNumber,user.PhoneNumberL,user.IsActive,cp.CompanyId,cp.Name,dep.DepartmentId,dep.DepartmentName,ur.RoleId,ur.RoleName');
		$this->db->where('user.UserId=',$user_id);
		$this->db->join('tblcompany cp','cp.CompanyId = user.CompanyId', 'left');
		$this->db->join('tblmstdepartment dep','dep.DepartmentId = user.DepartmentId', 'left');
		$this->db->join('tblmstuserrole ur','ur.RoleId = user.RoleId', 'left');
	//	$this->db->join('tblmstcountry coun', 'coun.CountryId = user.UserId', 'left');
	//	$this->db->join('tblmststate sta', 'sta.StateId = user.UserId', 'left');
		$result = $this->db->get('tbluser user');
		 $user_data= array();
		 foreach($result->result() as $row)
		 {
			$user_data=$row;
			
		 }
		 return $user_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
	
	
	function getlist_state()
	{
		$this->db->select('*');
		$result=$this->db->get('tblmststate');
		
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
		$this->db->select('*');
		$result=$this->db->get('tblmstuserrole');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function getlist_country() {
	
		$this->db->select('*');
		$result = $this->db->get('tblmstcountry');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}

	
	

	

	
}