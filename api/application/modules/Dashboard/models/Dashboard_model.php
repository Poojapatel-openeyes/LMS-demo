<?php

class Dashboard_model extends CI_Model
 {	
	
	public function getlist_Setting() {
	
		$this->db->select('*');
		$this->db->where('SettingName=','Register');
		$this->db->where('IsActive=',1);
			// $this->db->order_by('SettingName','asc');
			$result = $this->db->get('tblsetting');

			$res=array();
			if($result->result())
			{
				$res=$result->result();
			}
			return $res;
		
	}
	
}
