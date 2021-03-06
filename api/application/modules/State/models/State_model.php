<?php

class State_model extends CI_Model
{
	public function add_state($post_state)
	{
		
		if($post_state)
		{
			if($post_state['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$state_data=array(
				"StateId"=>trim($post_state['StateId']),
				"CountryId"=>trim($post_state['CountryId']),
				"StateName"=>trim($post_state['StateName']),
				"StateAbbreviation"=>trim($post_state['StateAbbreviation']),
				"IsActive"=>$IsActive,
				'CreatedBy' => trim($post_state['CreatedBy']),
				'CreatedOn' => date('y-m-d H:i:s')
		
				
			);	
				
				$res=$this->db->insert('tblmststate',$state_data);
				if($res)
				{
					$log_data = array(
						'UserId' => trim($post_state['CreatedBy']),
						'Module' => 'State',
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
	
	public function get_statedata($state_id=Null)
	{
	  if($state_id)
	  {
		 $this->db->select('StateId,StateName,StateAbbreviation,CountryId,IsActive');
		 $this->db->where('StateId',$state_id);
		 $result=$this->db->get('tblmststate');
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
	
	 public function edit_state($post_state) {
		
		if($post_state) 
		{
			if($post_state['IsActive']==1)
			{
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$state_data = array(
				"StateId"=>trim($post_state['StateId']),
				"CountryId"=>trim($post_state['CountryId']),
				"StateName"=>trim($post_state['StateName']),
				"StateAbbreviation"=>trim($post_state['StateAbbreviation']),
				"IsActive"=>$IsActive,
				'UpdatedBy' => trim($post_state['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s')
				
			);
			
			$this->db->where('StateId',trim($post_state['StateId']));
			$res = $this->db->update('tblmststate',$state_data);
			
			if($res) 
			{
				$log_data = array(
					'UserId' => trim($post_state['UpdatedBy']),
					'Module' => 'State',
					'Activity' =>'Edit'
	
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
	
	function getlist_state()
	{
		$this->db->select('st.StateId,st.StateName,st.StateAbbreviation,st.IsActive,con.CountryName,(SELECT COUNT(u.UserId) FROM tbluser as u WHERE u.StateId=st.StateId) as isdisabled');
			$this->db->join('tblmstcountry con', 'con.CountryId = st.CountryId', 'left');
		
		$result=$this->db->get('tblmststate st');
		
		$res=array();
		if($result->result())
		{
			$res=$result->result();
		}
		return $res;
	}
	
	public function delete_state($post_state) 
	{
	
		if($post_state) 
		{
			
			$this->db->where('StateId',$post_state['id']);
			$res = $this->db->delete('tblmststate');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_state['Userid']),
					'Module' => 'State',
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
	
	public function getlist_country() 
	{
	
		$this->db->select('*');
		$this->db->where('IsActive=1');
		//$this->db->order_by('CountryName','asc');
		$result = $this->db->get('tblmstcountry');
		
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
}