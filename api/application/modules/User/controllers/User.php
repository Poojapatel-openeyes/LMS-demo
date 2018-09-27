<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class User extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('User_model');
		include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
	}
	
	public function getStateList($country_id = NULL) {
		
		if(!empty($country_id)) {
			
			$result = [];
			$result = $this->User_model->getStateList($country_id);			
			echo json_encode($result);				
		}			
	}
	
	public function addUser()
	{
		$post_user = json_decode(trim(file_get_contents('php://input')), true);
		if ($post_user) 
			{
				if($post_user['UserId']>0)
				{
					$result = $this->User_model->edit_user($post_user);
					if($result)
					{

						if($post_user['RoleId']==2){


							$userId=$post_user['UserId'];
						$EmailToken = 'Admin register to SuperAdmin';
	
						$this->db->select('Value');
						$this->db->where('Key','EmailFrom');
						$smtp1 = $this->db->get('tblmstconfiguration');	
						foreach($smtp1->result() as $row) {
							$smtpEmail = $row->Value;
						}
						$this->db->select('Value');
						$this->db->where('Key','EmailPassword');
						$smtp2 = $this->db->get('tblmstconfiguration');	
						foreach($smtp2->result() as $row) {
							$smtpPassword = $row->Value;
						}
						$this->db->select('FirstName,LastName');
						$this->db->where('UserId',$userId);
						$smtp2 = $this->db->get('tbluser');	
						foreach($smtp2->result() as $row) {
							$FirstName = $row->FirstName;
							$LastName = $row->LastName;
						}
				
						// $config['protocol']  = 'smtp';
						// $config['smtp_host'] = 'ssl://smtp.googlemail.com';
						// $config['smtp_port'] = '465';
						// $config['smtp_user']='myopeneyes3937@gmail.com';
						// $config['smtp_pass']='W3lc0m3@2018';
						$config['protocol']='mail';
						$config['smtp_host']='vps40446.inmotionhosting.com';
						$config['smtp_port']='587';
						$config['smtp_user']=$smtpEmail;
						$config['smtp_pass']=$smtpPassword;
						
						$config['charset']='utf-8';
						$config['newline']="\r\n";
						$config['mailtype'] = 'html';							
						$this->email->initialize($config);
				
						$query = $this->db->query("SELECT et.To,et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
						foreach($query->result() as $row){ 
							if($row->To==2){
							$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
							$rowTo = $queryTo->result();
							$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
							$body = $row->EmailBody;
							// foreach($query1->result() as $row1){			
							// 	$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
							// 	$result2 = $query2->result();
							// 	$body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body,$post_user['Code']);					
							// } 
							if($row->BccEmail!=''){
								$bcc = $row->BccEmail.','.$row->totalbcc;
							} else {
								$bcc = $row->totalbcc;
							}
							$body = str_replace("{ first_name }",$FirstName,$body);
							$body = str_replace("{ last_name }",$LastName,$body);
						//	$body = str_replace("{ role }",$RoleName,$body);
							$this->email->from($smtpEmail, 'LMS Admin');
							$this->email->to($rowTo[0]->EmailAddress);		
							$this->email->subject($row->Subject);
							$this->email->cc($row->totalcc);
							$this->email->bcc($bcc);
							$this->email->message($body);
							if($this->email->send())
							{
								
								//echo json_encode("Success");
							}else
							{
								//echo json_encode("Fail");
							}
						
						} 
						else {
							$userId_ar = explode(',', $row->totalTo);			 
							foreach($userId_ar as $userId){
							   $queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
							   $rowTo = $queryTo->result();
							   $query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
							   $body = $row->EmailBody;
							//    foreach($query1->result() as $row1){			
							// 	   $query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId_backup);
							// 	   $result2 = $query2->result();
							// 	   $body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body,$post_user['Code']);					
							//    } 
							$body = str_replace("{ first_name }",$FirstName,$body);
							$body = str_replace("{ last_name }",$LastName,$body);
							//$body = str_replace("{ role }",$RoleName,$body);
							   $this->email->from($smtpEmail, 'LMS Admin');
							   $this->email->to($rowTo[0]->EmailAddress);		
							   $this->email->subject($row->Subject);
							   $this->email->cc($row->totalcc);
							   $this->email->bcc($row->BccEmail.','.$row->totalbcc);
							   $this->email->message($body);
							   if($this->email->send())
							   {
								  // echo 'success';
							   }else
							   {
								   //echo 'fail';
							   }
						   }
						}

					}
					
						//echo json_encode($post_user);	
						$token = array(
							"UserId" => $post_user['UserId'],
							"RoleId" => $post_user['RoleId'],
							"EmailAddress" => $post_user['EmailAddress'],
							"FirstName" => $post_user['FirstName'],
							"LastName" => $post_user['LastName']
							);

							$jwt = JWT::encode($token, "MyGeneratedKey","HS256");
							$output['token'] = $jwt;
							echo json_encode($output);	


						} else {
							$userId=$post_user['UserId'];
						$EmailToken = 'Registration Complete';
	
						$this->db->select('Value');
						$this->db->where('Key','EmailFrom');
						$smtp1 = $this->db->get('tblmstconfiguration');	
						foreach($smtp1->result() as $row) {
							$smtpEmail = $row->Value;
						}
						$this->db->select('Value');
						$this->db->where('Key','EmailPassword');
						$smtp2 = $this->db->get('tblmstconfiguration');	
						foreach($smtp2->result() as $row) {
							$smtpPassword = $row->Value;
						}
						$this->db->select('FirstName,LastName,EmailAddress');
						$this->db->where('UserId',$userId);
						$smtp2 = $this->db->get('tbluser');	
						foreach($smtp2->result() as $row) {
							$FirstName = $row->FirstName;
							$LastName = $row->LastName;
							$EmailAddress = $row->EmailAddress;
							
							
						}
				
						$config['protocol']='mail';
						$config['smtp_host']='vps40446.inmotionhosting.com';
						$config['smtp_port']='587';
						$config['smtp_user']=$smtpEmail;
						$config['smtp_pass']=$smtpPassword;
						
						$config['charset']='utf-8';
						$config['newline']="\r\n";
						$config['mailtype'] = 'html';							
						$this->email->initialize($config);
				
						$query = $this->db->query("SELECT et.To,et.Subject,et.EmailBody,et.BccEmail,(SELECT GROUP_CONCAT(UserId SEPARATOR ',') FROM tbluser WHERE RoleId = et.To && ISActive = 1) AS totalTo,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Cc && ISActive = 1) AS totalcc,(SELECT GROUP_CONCAT(EmailAddress SEPARATOR ',') FROM tbluser WHERE RoleId = et.Bcc && ISActive = 1) AS totalbcc FROM tblemailtemplate AS et WHERE et.Token = '".$EmailToken."' && et.IsActive = 1");
						foreach($query->result() as $row){ 
							if($row->To==4 || $row->To==3){
							$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
							$rowTo = $queryTo->result();
							$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
							$body = $row->EmailBody;
							// foreach($query1->result() as $row1){			
							// 	$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
							// 	$result2 = $query2->result();
							// 	$body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body,$post_user['Code']);					
							// } 
							if($row->BccEmail!=''){
								$bcc = $row->BccEmail.','.$row->totalbcc;
							} else {
								$bcc = $row->totalbcc;
							}
							$body = str_replace("{ email_address }",$EmailAddress,$body);	
							$body = str_replace("{ first_name }",$FirstName,$body);
							$body = str_replace("{ last_name }",$LastName,$body);
							// $body = str_replace("{ role }",$RoleId,$body);
							$this->email->from($smtpEmail, 'LMS Admin');
							$this->email->to($rowTo[0]->EmailAddress);		
							$this->email->subject($row->Subject);
							$this->email->cc($row->totalcc);
							$this->email->bcc($bcc);
							$this->email->message($body);
							if($this->email->send())
							{
								
								//echo json_encode("Success");
							}else
							{
								//echo json_encode("Fail");
							}
						}  
						
						else {
							$userId_ar = explode(',', $row->totalTo);			 
							foreach($userId_ar as $userId){
							   $queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
							   $rowTo = $queryTo->result();
							   $query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
							   $body = $row->EmailBody;
							//    foreach($query1->result() as $row1){			
							// 	   $query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId_backup);
							// 	   $result2 = $query2->result();
							// 	   $body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body,$post_user['Code']);					
							//    } 
							$body = str_replace("{ first_name }",$FirstName,$body);
							$body = str_replace("{ last_name }",$LastName,$body);
							//$body = str_replace("{ role }",$RoleName,$body);
							   $this->email->from($smtpEmail, 'LMS Admin');
							   $this->email->to($rowTo[0]->EmailAddress);		
							   $this->email->subject($row->Subject);
							   $this->email->cc($row->totalcc);
							   $this->email->bcc($row->BccEmail.','.$row->totalbcc);
							   $this->email->message($body);
							   if($this->email->send())
							   {
								  // echo 'success';
							   }else
							   {
								   //echo 'fail';
							   }
						   }
						}

					}
					
						//echo json_encode($post_user);	
						$token = array(
							"UserId" => $post_user['UserId'],
							"RoleId" => $post_user['RoleId'],
							"EmailAddress" => $post_user['EmailAddress'],
							"FirstName" => $post_user['FirstName'],
							"LastName" => $post_user['LastName']
							);

							$jwt = JWT::encode($token, "MyGeneratedKey","HS256");
							$output['token'] = $jwt;
							echo json_encode($output);	


						}


						// $FirstName=$post_user['FirstName'];
						// $LastName=$post_user['LastName'];
						// $RoleName=$post_user['RoleName'];

						
					}






					
					
				}
				else
				{
					
					$result = $this->User_model->add_user($post_user); 
			
					if($result)
					{
						echo json_encode($post_user); 
						
					}	
				}
					
			}
	}
	
	
	//Delete UserList
	
	public function deleteUser() {
		$post_user = json_decode(trim(file_get_contents('php://input')), true);		

		if ($post_user)
		 {
			if($post_user['id'] > 0){
				$result = $this->User_model->delete_user($post_user);
				if($result) {
					
					echo json_encode("Delete successfully");
					}
		 	}
		
			
		} 
			
	}


	public function resetpasslink()
		{
								
		$post_user = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_user)
			{
					
				$result = $this->User_model->reset_passlink($post_user);
			
				if($result)
				{
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('Code duplicate');
				}
										
			}
		}
		
		public function resetpasslink2()
		{				
		$post_user = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_user)
			{
				
			
				$result = $this->User_model->reset_passlink2($post_user);
				
				if($result)
				{
						echo json_encode('Success');
				}	
				else
				{
					
					echo json_encode('fail');
				}
										
		}
		
	}




	//get userId edit
	public function getById($user_id=null)
	{	
		
		if(!empty($user_id))
		{
			$data=[];
			$data=$this->User_model->get_userdata($user_id);
			echo json_encode($data);
		}
	}
	
	
	
	// Add Status
	public function getAllUserList()
	{
		
			$data=$this->User_model->getlist_user();
			echo json_encode($data);
		
		
	}

	public function getAllUserList_tool()
	{
		$data=$this->User_model->getlist_user_tool();
		echo json_encode($data);

	}	

	public function getAllDefaultData()
	{
		//$data="";
		$data['company']=$this->User_model->getlist_company();
		$data['department']=$this->User_model->getlist_department();
		$data['role']=$this->User_model->getlist_userrole();
		$data['country']=$this->User_model->getlist_country();
		$data['state']=$this->User_model->getlist_state();
		echo json_encode($data);
	}
}
