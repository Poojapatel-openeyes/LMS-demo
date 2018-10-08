<?php

class Company_model extends CI_Model
{
			
	public function add_company($post_company)
	{	if($post_company['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
		if($post_company)
		{
			$company_data = array(
				'CompanyId' => $post_company['CompanyId'],
				'Name' => $post_company['Name'],
				'ParentId' => $post_company['ParentId'],
				'EmailAddress' => $post_company['EmailAddress'],
				'Address' => $post_company['Address'],
				'IndustryId' => $post_company['IndustryId'],
				'Website' => $post_company['Website'],
				'WorkingDays' => $post_company['WorkingDays'],
				'PhoneNo' => $post_company['PhoneNo'],
				'IsActive' => $IsActive,
				'CreatedBy' => $post_company['CreatedBy'],
				'CreatedOn' => date('y-m-d H:i:s')
			);
				
				$res=$this->db->insert('tblcompany',$company_data);
				if($res)
				{	
					$log_data = array(
						'UserId' => trim($post_company['CreatedBy']),
						'Module' => 'Company',
						'Activity' =>'Add'
		
					);
					$log = $this->db->insert('tblactivitylog',$log_data);
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
	
	public function get_companydata($company_id=Null)
	{
	  if($company_id)
	  {

		 $this->db->select('cp.CompanyId,cp.Name,cp.EmailAddressCom,cp.Address,cp.IndustryId,cp.Website,cp.WorkingDays,cp.PhoneNo,cp.IsActive,(SELECT COUNT(u.UserId) FROM tbluser as u WHERE u.CompanyId=cp.CompanyId) as isdisabled');
		 $this->db->order_by('cp.Name','asc');
		 $this->db->where('CompanyId',$company_id);
		 $result=$this->db->get('tblcompany cp');
		 $company_data= array();
		 foreach($result->result() as $row)
		 {
			$company_data=$row;
			
		 }
		 return $company_data;
		 
	  }
	  else
	  {
		  return false;
	  }
	}
	
	 public function edit_company($post_company)
	 {
		
		if($post_company) {
			if($post_company['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$company_data = array(
				'CompanyId' => $post_company['CompanyId'],
				//'ParentId' => $post_company['ParentId'],
				'Name' => $post_company['Name'],
				'EmailAddressCom' => $post_company['EmailAddressCom'],
				'Address' => $post_company['Address'],
				'IndustryId' => $post_company['IndustryId'],
				'Website' => $post_company['Website'],
				'WorkingDays' => $post_company['WorkingDays'],
				'PhoneNo' => $post_company['PhoneNo'],
				'IsActive' => $IsActive,
				'UpdatedBy' =>trim($post_company['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s')
				
			);
			
			$this->db->where('CompanyId',trim($post_company['CompanyId']));
			$res = $this->db->update('tblcompany',$company_data);
			
			if($res) 
			{	
				$log_data = array(
					'UserId' =>trim($post_company['UpdatedBy']),
					'Module' => 'Company',
					'Activity' =>'Update'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
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
	
	function getlist_company()
	{
		
		// $this->db->select('cp.CompanyId,cp.ParentId,cp.Name,cp.EmailAddress,cp.Address,cp.IndustryId,cp.Website,cp.PhoneNo,cp.IsActive,in.IndustryName');
		// $this->db->join('tblmstindustry in', 'cp.IndustryId = in.IndustryId', 'left');
		// $result = $this->db->get('tblcompany cp');

		$this->db->select('cp.CompanyId,cp.Name,cp.EmailAddressCom,cp.Address,cp.IndustryId,cp.Website,cp.WorkingDays,cp.PhoneNo,cp.IsActive,in.IndustryName,(SELECT COUNT(u.UserId) FROM tbluser as u WHERE u.CompanyId=cp.CompanyId) as isdisabled');
		 //$this->db->select('cp.CompanyId,cp.ParentId,cp.Name,cp.EmailAddressCom,cp.Address,cp.IndustryId,cp.Website,cp.PhoneNo,cp.IsActive,in.IndustryName');
		 $this->db->join('tblmstindustry in', 'cp.IndustryId = in.IndustryId', 'left');
		$result = $this->db->get('tblcompany cp');
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
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
	

	


	public function delete_company($post_company) 
	{
	
		if($post_company) 
		{
			
			$this->db->where('CompanyId',$post_company['id']);
			$res = $this->db->delete('tblcompany');
			
			if($res) {
				$log_data = array(
					'UserId' =>trim($post_company['Userid']),
					'Module' => 'Company',
					'Activity' =>'Delete'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
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
	
	
	//list Industry
	public function getlist_Industry() {
	
		$this->db->select('IndustryId,IndustryName');
		$this->db->where('IsActive="1"');
		$this->db->order_by('IndustryName','asc');
		$result = $this->db->get('tblmstindustry');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
}