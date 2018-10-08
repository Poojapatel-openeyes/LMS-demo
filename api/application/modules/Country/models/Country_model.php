<?php

class Country_model extends CI_Model
 {

	public function add_Country($post_Country) {
			
		if($post_Country) {
			
			if($post_Country['IsActive']==1)
			{
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$Country_data = array(
				'CountryId' => trim($post_Country['CountryId']),
				'CountryName' => trim($post_Country['CountryName']),
				'CountryAbbreviation' => trim($post_Country['CountryAbbreviation']),
				'PhonePrefix' => trim($post_Country['PhonePrefix']),
				"IsActive"=>$IsActive,
				"CreatedBy" =>trim($post_Country['CreatedBy']),
				"CreatedOn" =>date('y-m-d H:i:s')
			
			);
			
			$res = $this->db->insert('tblmstcountry',$Country_data);
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Country['CreatedBy']),
					'Module' => 'Country',
					'Activity' =>'Add'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Country() {
	
		//$this->db->select('*');
		$this->db->select('co.CountryId,co.CountryName,co.CountryAbbreviation,co.PhonePrefix,co.IsActive,(SELECT COUNT(u.UserId) FROM tbluser as u WHERE u.CountryId=co.CountryId) as isdisabled');
		$this->db->order_by('co.CountryName','asc');
		$result = $this->db->get('tblmstcountry co');
		$res = array();
		if($result->result()) {
			$res = $result->result();
		}
		return $res;
		
	}
	
	
	public function get_Countrydata($Country_Id = NULL)
	{
		
		if($Country_Id) {
			
			$this->db->select('CountryId,CountryName,CountryAbbreviation,PhonePrefix,IsActive');
			$this->db->where('CountryId',$Country_Id);
			$result = $this->db->get('tblmstcountry');
			
			$Country_data = array();
			foreach($result->result() as $row) {
				$Country_data = $row;
			}
			return $Country_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Country($post_Country) {
	
		if($post_Country) {
			 if($post_Country['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
					$Country_data = array(
				'CountryName' => trim($post_Country['CountryName']),
				'CountryAbbreviation' => trim($post_Country['CountryAbbreviation']),
				'PhonePrefix' => trim($post_Country['PhonePrefix']),
				"IsActive"=>$IsActive,
				"UpdatedBy" =>  trim($post_Country['UpdatedBy']),
				'UpdatedOn' => date('y-m-d H:i:s')
			
			);
			
			$this->db->where('CountryId',$post_Country['CountryId']);
			$res = $this->db->update('tblmstcountry',$Country_data);
			
			if($res) {
				$log_data = array(
					'UserId' =>  trim($post_Country['UpdatedBy']),
					'Module' => 'Country',
					'Activity' =>'Update'
	
				);
				$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_Country($post_Country) {
	
		if($post_Country) {
			
			$this->db->where('CountryId',$post_Country['id']);
			$res = $this->db->delete('tblmstcountry');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Country['Userid']),
					'Module' => 'Country',
					'Activity' =>'Delete'

				);
				$log = $this->db->insert('tblactivitylog',$log_data);
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		
	}
	
}
