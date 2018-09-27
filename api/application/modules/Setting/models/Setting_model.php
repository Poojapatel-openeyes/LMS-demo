<?php

class Setting_model extends CI_Model
 {

	public function add_Setting($post_Setting) {
		
		if($post_Setting) {
			
			if($post_Setting['IsActive']==1)
			{
				$IsActive = true;
			} else {
				$IsActive = false;
			}
			$Setting_data = array(
				"SettingId"=>trim($post_Setting['SettingId']),
				'SettingName' => trim($post_Setting['SettingName']),
				'Path' => trim($post_Setting['Path']),
				"IsActive"=>$IsActive,
				"CreatedBy" =>1,
				"UpdatedBy" =>1
			
			);
			
			$res = $this->db->insert('tblsetting',$Setting_data);
			
			if($res) {
				
				return true;
			} else {
				return false;
			}
	
		} else {
			return false;
		}
	}
	
	public function getlist_Setting() {
	
		$this->db->select('*');
	//	$this->db->where('SettingName=','Register');
		//$this->db->where('IsActive=',1);
			// $this->db->order_by('SettingName','asc');
			$result = $this->db->get('tblsetting');

			$res=array();
			if($result->result())
			{
				$res=$result->result();
			}
			return $res;
		
	}
	
	
	public function get_Settingdata($Setting_Id = NULL)
	{
		
		if($Setting_Id) {
			
			$this->db->select('*');
			$this->db->where('SettingId',$Setting_Id);
			$result = $this->db->get('tblsetting');
			
			foreach($result->result() as $row) {
				$Setting_model_data = $row;
			}
			return $Setting_model_data;
			
		} else {
			return false;
		}
	}
	
	
	public function edit_Setting($post_Setting) {
	
		if($post_Setting) {
			 if($post_Setting['IsActive']==1)
					{
						$IsActive = true;
					} else {
						$IsActive = false;
					}
			$Setting_data = array(
				'SettingName' => trim($post_Setting['SettingName']),
				'Path' => trim($post_Setting['Path']),
				"IsActive"=>$IsActive,
				"UpdatedBy" =>1,
				'UpdatedOn' => date('y-m-d H:i:s')
			
			);
			
			$this->db->where('SettingId',$post_Setting['SettingId']);
			$res = $this->db->update('tblsetting',$Setting_data);
			
			if($res) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}	
	
	}
	
	
	public function delete_Setting($post_Setting) {
	
		if($post_Setting) {
			
			$this->db->where('SettingId',$post_Setting['id']);
			$res = $this->db->delete('tblsetting');
			
			if($res) {
				$log_data = array(
					'UserId' => trim($post_Setting['Userid']),
					'Module' => 'Setting',
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
