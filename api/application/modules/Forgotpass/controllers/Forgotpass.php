<?php
defined('BASEPATH') OR exit('No direct script access allowed');
use \Firebase\JWT\JWT;

class Forgotpass extends CI_Controller 
{	
	public function __construct()
	{
		parent::__construct();
		$this->load->model('Forgotpass_model');
		include APPPATH . 'vendor/firebase/php-jwt/src/JWT.php';
	}
	
	public function test(){
		echo 'sdfsdf'.BASE_URL.'/resetpass/';
	}

	
	
	public function userpass()
		{				 		
		$post_pass = json_decode(trim(file_get_contents('php://input')), true);		
		if ($post_pass)
			{
				$post_pass['VCode']=mt_rand(100000, 999999);
				
				$result = $this->Forgotpass_model->forgot_pass($post_pass);
				if($result)
				{	
					
					 $userId=$result;

					 $data['UserId']=$userId;
					 $data['VCode']=$post_pass['VCode'];
					 $data['EmailAddress']=$post_pass['EmailAddress'];
					 $EmailToken = 'Forgot Password';


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

					 
					//  $config['protocol']  = 'smtp';
					//  $config['smtp_host'] = 'ssl://smtp.googlemail.com';
					//  $config['smtp_port'] = '465';
					//  $config['smtp_user']='myopeneyes3937@gmail.com';
					//  $config['smtp_pass']='W3lc0m3@2018';
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
						 if($row->To==4){
						 $queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
						 $rowTo = $queryTo->result();
						 $query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
						 $body = $row->EmailBody;
						//  foreach($query1->result() as $row1){			
						// 	 $query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId);
						// 	 $result2 = $query2->result();
						// 	 $body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);
						// //	 $body = str_replace("{ link }",''.BASE_URL.'/resetpass/'.JWT::encode($data,"MyGeneratedKey","HS256").'',$body);
												
						//  } 
						$body = str_replace("{ email_address }",$EmailAddress,$body);
						$body = str_replace("{ first_name }",$FirstName,$body);
						$body = str_replace("{ last_name }",$LastName,$body);
						$body = str_replace("{ link }",''.BASE_URL.'/resetpass/'.JWT::encode($data,"MyGeneratedKey","HS256").'',$body);
					
						 if($row->BccEmail!=''){
							 $bcc = $row->BccEmail.','.$row->totalbcc;	
						 } else {
							 $bcc = $row->totalbcc;
						 }


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
					 }  else {
						 $userId_ar = explode(',', $row->totalTo);			 
						 foreach($userId_ar as $userId){
							$queryTo = $this->db->query('SELECT EmailAddress FROM tbluser where UserId = '.$userId); 
							$rowTo = $queryTo->result();
							$query1 = $this->db->query('SELECT p.PlaceholderId,p.PlaceholderName,t.TableName,c.ColumnName FROM tblmstemailplaceholder AS p LEFT JOIN tblmsttablecolumn AS c ON c.ColumnId = p.ColumnId LEFT JOIN tblmsttable AS t ON t.TableId = c.TableId WHERE p.IsActive = 1');
							$body = $row->EmailBody;
							// foreach($query1->result() as $row1){			
							// 	$query2 = $this->db->query('SELECT '.$row1->ColumnName.' AS ColumnName FROM '.$row1->TableName.' AS tn LEFT JOIN tblmstuserrole AS role ON tn.RoleId = role.RoleId LEFT JOIN tblmstcountry AS con ON tn.CountryId = con.CountryId LEFT JOIN tblmststate AS st ON tn.StateId = st.StateId LEFT JOIN tblcompany AS com ON tn.CompanyId = com.CompanyId LEFT JOIN tblmstindustry AS ind ON com.IndustryId = ind.IndustryId WHERE tn.UserId = '.$userId_backup);
							// 	$result2 = $query2->result();
							// 	$body = str_replace("{ ".$row1->PlaceholderName." }",$result2[0]->ColumnName,$body);					
							// } 
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
				 echo json_encode('Success');
				 

					
				}	
				else
				{
					
					echo json_encode("Code duplicate");
				}
										
		}
		
	}
	


	
	
	
	
}
