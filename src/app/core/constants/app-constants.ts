export const ImagePaths = {
  RelativePathImagesForShared: './../../../../assets/images/',
  RelativePathImagesForModules: '../../../../assets/images/'
};

export const FileTypes = {
  DOC: 'word',
  DOCX: 'word',
  PDF: 'pdf',
  XLS: 'excel',
  XLSX: 'excel'
};
export const IconColor = {
  DOC: 'blue',
  DOCX: 'blue',
  PDF: 'red',
  XLS: 'green',
  XLSX: 'green'
};
// Api endPoints
export const ApiEndPoints = {
  // MasterData
  States: 'MasterData/States',
  UploadDocumentToMP: 'MasterData/UpdateDigitalDocumentId',
  GetSecurityQuestions: 'MasterData/SecurityQuestions',

  // Registration
  MemberVerification: 'MemberRegistration/IsValid',
  MemberRegistration: 'MemberRegistration/Registration/',
  SendOTP: 'MemberRegistration/SendOtpForRegistration',
  IsValidOTP: 'MemberRegistration/IsValidOtp',

  // ResetPassword
  GetUserSecurityQuestions: 'ResetPassword/GetUserSecurityQuestions?userName=',
  // SendPasswordConfirmationEmail: 'ResetPassword/SendPasswordConfirmationEmail?UserId=',
  SendPasswordConfirmationEmail: 'ResetPassword/SendPasswordConfirmationEmail?userName=',
  IsValidUserSecurityQAs: 'ResetPassword/IsValidUserSecurityQAs',
  SendMemberAccountLockEmail: 'ResetPassword/SendMemberAccountLockEmail?userName=',

  // Claims
  ClaimsDetails: 'Claims/ClaimsDetails',

  // DashBoard
  GetSecurityQuestionsByUserId: 'DashBoard/GetSecurityQuestionsByUserId?userId=',
  UpdateSecurityQuestionsByUserId: 'DashBoard/UpdateSecurityQuestionsByUserId',
  GetMemberPlanTypes: 'Dashboard/GetMemberPlanTypes?userId=',
  MemberDashboardDetails: 'Dashboard/GetMemberDetailsForDashBoard?userId=',
  ClaimDependancies: 'Dashboard/GetMemberAndDependentNames?userId=',
  IsGroupMember: 'Dashboard/IsGroupMember?userId=',

  // DocumentForms
  // DocumentForms: 'member/MemberDocumentAndForm/',
  GetDocumentAndFormSearch: 'MemberDocumentAndForm/GetDocumentAndFormSearch',
  DocumentAndFormSectionList: 'MemberDocumentAndForm/DocumentAndFormSectionList',

  // MemberFeedback
  ContactUsStory: 'MemberFeedback/SaveFeedback',

  // Demographics
  Demographics: 'Demographics/MemberDemographics?userId=',
  UpdateSubscriberInformation: 'Demographics/UpdateMemberDemographics',
  DeleteDependent: 'Demographics/DeleteDependent?dependentDetailId=',
  AddDependent: 'Demographics/AddNewDependent',
  Questionire: 'Demographics/3/Questionnaires',

  // GetMemberGuideBook
  GetMemberGuideBook: 'PlanDetails/GetMemberGuideBook?userId=',
  // PlanDetails:'PlanDetails/',

  ProfilePictue: 'getdocumentbytearray/',
  UploadDocumentToDms: 'UploadDocuments',
  DemographicsEndPoint: 'Demographics/',

  // MemberFAQ
  FAQCategoryList: 'MemberFAQ/FAQCategoryList',
  FAQs: 'MemberFAQ/FAQs/',

  // Payment
  ChangePayment: 'Payment/PaymentInfo?userId=',
  UpdatePaymentInformation: 'Payment/UpdatePaymentInformation',
  PaymentReceipt: 'Payment/GetPaymentReceiptDetails',

  // ProviderSearch
  FetchProviderSearchURL: 'ProviderSearch/FetchProviderSearchURL?userId=',

  // MemberMessage
  Messages: 'MemberMessage/',
  GetMemberMessages: 'MemberMessage/GetMemberMessages/',
  GetMemberMessagesByPage: 'MemberMessage/GetMemberMessagesByPage/',
  Deletemessage: 'MemberMessage/DeleteMessage/',
  Archivemessage: 'MemberMessage/ArchiveMessage/',
  Markasread: 'MemberMessage/MarkAsRead/',
  GetUnreadMessageCount: 'MemberMessage/GetUnreadMessageCount/',

  // Accumulators
  FamilyAccumulators: 'Accumulators/MemberAccumulatorDetails?userId=',
  IndividualAccumulators: 'Accumulators/IndividualAccumulatorDetails?userId=',
};

export const ValidCartTypes = [
  { startWith: '4', cardType: 'Visa', length: 16 },
  { startWith: '5', cardType: 'Mastercard', length: 16 }, ,
  { startWith: '6011', cardType: 'Discover', length: 16 },
  { startWith: '644', cardType: 'Discover', length: 16 },
  { startWith: '65', cardType: 'Discover', length: 16 },
  { startWith: '3', cardType: 'AmericanExpress', length: 15 },
];
export const FORGOT_USER_NAME = 'For login related issues please get in touch with CustomerHealthcare Member Services at (844) 834-3456 or';


// registration messages
export const INVALID_MEMBERID =
  'Member ID provided is incorrect. Please enter correct Member ID';
export const MANDATORY_FIELDS = 'Please fill out the required fields';
export const MEMBER_ALREADY_REGISTERED =
  'Member ID provided by you is already registered. Please login with your credentials';
export const MEMBER_INVALID_DETAILS = 'Please enter correct Member Details';
export const USERNAME_HAS_SPECIAL_CHARACTER =
  'Special characters are not allowed';
export const USERNAME_AVAILABLE = 'Username available';
export const USERNAME_NOT_AVAILABLE =
  'This username name already exist, Please try another one';
export const USERNAME_PASSWORD_MATCHED = 'Username & password can not be same';
export const CONFIRM_PASSWORD_NOT_MATCHED =
  'Passwords entered do not match. Please make sure passwords match';
export const OTP_INVALID = 'OTP entered is invalid, Please enter a valid OTP';
export const OTP_VALID = 'OTP is verified Successfully.';
export const OTP_TOOLTIP =
  'One time password sent either to email or cellphone for verification';
export const REGISTRATION_AGREE =
  'Please read and agree to disclosures before submitting registration request';
// info messages
export const ContactUs = '<div class="contactText"><span style="color:#034C7B;"><b>Phone number:</b></span><br/>(844) 412-3019 <br/>' +
  '<span style="color:#034C7B;" > <b>Email: </b></span > <br/>info@CustomerHealthcarehealthcare.com<br/ > </div>';
export const PASSWORD_POLICY_INFO = '<span style="color:#ffba01;">Password Policy</span><br/>' +
  'Password entered should have at least "One uppercase letter, one lowercase letter, one number,' +
  ' one special character from the following !@#$%^&*_- and password length should be between 8 & 15 characters"';
export const PASSWORD_POLICY_ERROR =
  'Password entered is not as per the password policy. Please re-enter the password';
export const PASSWORD_POLICY_INFO_ERROR = 'Password entered should have at least "One uppercase letter, one lowercase letter,' +
  ' one number, one special character from the following !@#$%^&*_- and password length should be between 8 & 15 characters"';
export const PASSWORD_RESET_SUCCESS =
  'Password reset link has been sent to your registered email.';
export const QUESTIONS_UPDATE_SUCCESS =
  'Security questions and answers updated successfully';
export const WRONG_ANSWERS =
  'Answers provided by you are incorrect. Please try again';
export const FORGOT_PASSWORD_UNCESSFULL = 'For any assistance please get in touch with member services at (844) 834-3456';
export const PASSWORD_RESET_SUCCESSFULLY = 'Password reset successful';
export const PASSWORD_ALREADY_USED =
  'Your previous and current password cannot be same';
export const CURRENT_PASSWORD_INCORRECT =
  'Current password is incorrect. Please re-enter';
// regex
export const PASSWORD_REGEX_STRONG =
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_-])(?=.{15,})';
export const PASSWORD_REGEX_MEDIUM =
  // '^(((?=.*[a-z])(?=.*[A-Z]))(?=.*[_!@#$%^&*])((?=.*[a-z])(?=.*[0-9]))((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})';
  '^(((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]))(?=.*[-_!@#$%^&*]))(?=.{8,})';

// form validation messages
export const PASSWORD_NOT_MATCH =
  'Passswords entered do not match. Please make sure passwords match';
export const FILL_REQUIRED_FIELDS = 'Please fill out the required fields';
export const COPYPASTENOTALLOED = 'Copy & Paste Not Allowed';
export const USERNAMEMUST =
  'Please enter your username and then select Forgot your password link';
export const INVALIDUSER =
  'Either username or password entered by you is incorrect';
export const INVALID_EMAIL = 'Please enter a valid Email ID';
export const INVALID_ZIPCODE = 'Please enter a valid Zip Code';
export const INVALID_PHONENUMBER = 'Please enter a valid Phone Number';

// Login error messages list
export const LOGIN_ERROR_5001 =
  'Either username or password entered by you is incorrect';
export const INVALID_USERNAME = 'Username entered by you is invalid';
export const LOGIN_ERROR_5002 =
  'Your account has been locked due to security purposes. Please refer to your email for assistance';
export const LOGIN_ERROR_5003 =
  'You have 1 attempt left, after which your account will be locked';
export const LOGIN_ERROR_5004_1 = 'You have 4 attempt(s) left';
export const LOGIN_ERROR_5004_2 = 'You have 3 attempt(s) left';
export const LOGIN_ERROR_5004_3 = 'You have 2 attempt(s) left';

// Reset password page
export const TOKKEN_EXPIRED =
  'Password reset link is expired. Please use "Forgot your password?" option again to reset your password';
export const USER_NOT_FOUND = 'User not found';
export const RESET_PASSWORD_SUCCESSFULL =
  ' Your password has been successfully reset';
export const PAYMENT_CARD_INVALID =
  'Please enter valid credit card details';
export const NO_SAME_PASSWORD =
  'Your previous and current password can not be same';
export const RESET_PASSWORD_FAIL = 'Password reset failed';
export const VERIFY_member_INVALID_DETAILS =
  'Answers provided by you are incorrect. Please try again';
export const VERIFY_member_INVALID_DATE = 'Please enter valid date ';
export const RESET_LINK_EXPIRED = 'Password reset link is expired. Please use “Forgot your password?” option again to reset your password';
export const FORGOT_PASSWORD_ACTIVATE_ERROR = 'Please enter username in login page and click on forgotPassword link';
export const ACCOUNT_LOCKED_OUT = 'Your account has been locked due to security purposes.Please refer to your email for assistance';
export const PASSWORD_EXPIRED = 'Your password is expired. Please reset your password to login';
export const PASSWORD_CHANGED_SUCCESS = 'Password changed successfully';
export const PAYMENT_UPDATE_SUCCESS = 'Payment details added successfully';

// external mail id's
export const Customer_MAIL = 'info@CustomerHealthcarehealth.com';
// icons names
export const ICON_CONGRATS_LEFT = 'Icons_Congrtulations_Left.png';
export const ICON_CONGRATS_RIGHT = 'Icons_Congrtulations_Right.png';
export const ICON_PASSWORD = 'Icons_Password.png';
export const ICON_UNLOCK = 'Icons_Unlock.png';
export const ICON_ACTIVATE = 'Icons_Activate.png';
export const ICON_DOCUMENTS = 'Icons_Documents.png';
export const ICON_FAQ = 'Icons_FAQ.png';
export const ICON_CONTACTUS = 'Icons_ContactUs.png';
export const ICON_MESSAGES = 'Icons_Messages.png';
export const ICON_IDCARD = 'Icons_IDCard.png';
export const ICON_PLAN_DETAILS = 'Icons_IDCard.png';

// ID Card
export const IDCARD_DOWNLOAD = 'IDCardDownload.png';

// payment
export const ICON_PAYMENT = 'Payment/Icon_Payment.png';
export const ICON_PAYMENT_RECIPT = 'Payment/Icons_Receipt.png';

export const ICON_PAYMENT_dollar = 'Payment/Dollar.png';
export const ICON_PAYMENT_Account = 'Payment/Icon_Account.png';
export const ICON_PAYMENT_Date = 'Payment/Icon_date.png';
export const ICON_PAYMENT_Visa = 'Payment/Icon_Visa.png';
export const ICON_PAYMENT_Master = 'Payment/Icon_Master.png';
export const ICON_PAYMENT_American = 'Payment/Icon_American.png';
export const ICON_PAYMENT_Discover = 'Payment/Icon_Discover.png';
// messages icons
export const ICON_MSG_Inbox_Default = 'Messages/Inbox_Default.png';
// export const ICON_MSG_Inbox_Active = 'Messages/Archive_Active.png';
export const ICON_MSG_Archive_Default = 'Messages/Archive_Default.png';
// export const ICON_MSG_Archive_Active = 'Messages/Archive_Active.png';
export const ICON_MSG_MoveToInbox = 'Messages/MovetoInbox.png';
export const ICON_MSG_Delete = 'Messages/Delete.png';
export const ICON_MSG_Archive = 'Messages/Archive.png';
export const ICON_MSG_Read = 'Messages/Read.png';
export const ICON_MSG_Unread = 'Messages/Unread.png';
// Global Menu
export const home_icon = 'top-navbar/home.png';
export const notification_icon = 'top-navbar/notification.png';
export const faq_icon = 'top-navbar/faq.png';
export const contactUs_icon = 'top-navbar/contactUs.png';
// Contact Us
export const THANK_YOU = 'Thanks for sharing your story';
export const THANK_YOU_CONTACT = 'Thanks for getting in touch with CustomerHealthcare';
export const location = 'Contact Us/location.png';
export const phone = 'Contact Us/phone.png';
export const mail = 'Contact Us/mail.png';
export const services = 'Contact Us/services.png';
export const facebook = 'Contact Us/facebook.png';
export const linkden = 'Contact Us/linkden.png';
export const fbLink = 'https://www.facebook.com/pages/category/Consulting-Agency/CustomerHealthcare-Healthcare-183629259063477/';
export const linkdenLink = 'https://www.linkedin.com/company/CustomerHealthcare-healthcare-inc-';

export const BROWSER_COMPATIBILTY_DESCRIPTION
  = ' The application is best compatible with Chrome, Firefox and Edge browsers. Please use Chrome, Firefox or Edge browser for best experience ';
// terms and conditions
//export const TERMS_CONDITIONS = ' The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter\'s wedding.His beloved son Michael has just come home from the war, but does not intend to become part of his father\'s business. Through Michael\'s life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family. The story begins as Don Vito Corleone, the head of a New York Mafia family, oversees his daughter\'s wedding. His beloved son Michael has just come home from the war, but does not intend to become part of his fathe\'s business. Through Michael\'s life the nature of the family business becomes clear. The business of the family is just like the head of the family, kind and benevolent to those who give respect, but given to ruthless violence whenever anything stands against the good of the family.';
export const TERMS_CONDITIONS = '<div><h3>CustomerHealthcare Healthcare Plan Disclosures</h3><p>This is not a contract. This is a voluntary program offered by CustomerHealthcare Healthcare, in relationship with a HealthCare Sharing Ministry (HCSM) program offered within certain plans. Your membership is with CustomerHealthcare and cannot be transferred to anyone else. Only you and your enrolled dependents are eligible under the membership.</p><p>All CustomerHealthcare members utilizing any Health Care Sharing Ministry services are required to declare their acknowledgment of the Statement of Beliefs and make an attestation that they are of like mind with the ministry beliefs.</p></div>' +
  '<div><span style="text-align:center;"><h4 style="text-decoration: underline;">Statement of Beliefs</h4></span><ol><li>We believe that our personal rights and liberties originate from God and are bestowed on us by God.</li><li>We believe every individual has a fundamental religious right to worship God in his or her own way.</li><li>We believe it is our moral and ethical obligation to assist our fellow man when he/she is in need according to our available resources and opportunity.</li><li>We believe it is our spiritual duty to God and our ethical duty to others to maintain a healthy lifestyle and avoid foods, behaviors or habits that produce sickness or disease to ourselves or others</li><li>We believe it is our fundamental right of conscience to direct our own healthcare, in consultation with physicians, family or other valued advisors.</li></ol></div>' +
  '<div><h4>DISCLAIMER</h4><p>THE MINISTRY IS NOT AN INSURANCE COMPANY AND THE MINISTRY DOES NOT OFFER ANY INSURANCE PRODUCTS OR POLICIES. THE MINISTRY DOES NOT ASSUME ANY RISK FOR YOUR MEDICAL EXPENSES, AND THE MINISTRY MAKES NO PROMISE TO PAY. HEALTH CARE SHARING MINISTRIES ARE NOT GOVERNED BY INSURANCE LAWS.</p><p>THE HEALTH CARE SHARING MINISTRY OFFERS VOLUNTARY PARTICIPATION IN ITS HEALTH CARE SHARING MINISTRY. MINISTRY SERVICES ARE ADMINISTERED BY CustomerHealthcare HEALTHCARE, INC.</p></div>' +
  '<div><h5>This is not Insurance</h5><p>A Health Care Sharing Ministry (“HCSM”) is a group of individuals that share a common set of ethical or religious beliefs and share their medical expenses in accordance with those beliefs without regard to the state in which a member resides or is employed.</p><p>Services are based on a religious tradition of mutual aid, neighborly assistance, and burden sharing. The ministry does not subsidize self-destructive behaviors and lifestyles but is specifically tailored for individuals who maintain a healthy lifestyle, make responsible choices regarding health and care, and believe in helping others. A Health Care Sharing Ministry program is <b>NOT</b> health insurance</p></div>' +
  '<div><h5>Tax Exemption</h5><p>YOU SHOULD CONSULT WITH A TAX PROFESSIONAL FOR DETAILS REGARDING YOUR EXEMPTION.</p></div>' +
  '<div><h4>Health Care Sharing Disclosures</h4><h5>Promise to Pay</h5><p>The ministry does not make a promise to pay or any guarantee of payment of your medical expenses. You will be responsible for the payment of your medical bills. The ministry does not assume your risk. The ministry does not guarantee that your medical expenses will be shared by other members participating in an CustomerHealthcare Plan that utilize health care sharing services.</p><h5>Voluntary</h5><p>Participation in the ministry HCSM is voluntary. Enrollment as an CustomerHealthcare member and participant of the ministry HCSM is voluntary and the sharing of monetary contributions are also voluntary. Enrollment in the ministry sharing plan is not a contract. You are free to cancel your participation at any time. The ministry requests a Monthly Share Amount, to be collected each month you are enrolled, to facilitate the payment of sharing requests published on behalf of other participants</p></div>' +
  '<div><h5>Guidelines</h5><p>The ministry manages its sharing contributions by establishing guidelines that define eligible sharing (“Guidelines”). The Guidelines are not a contract of insurance. They do not constitute an agreement, a promise to pay, or an obligation to share. The Guidelines are intended to ensure that every participant has paid their own medical expenses, as they are financially able, before requesting others to share with you to assist in paying remaining medical expenses. The Guidelines specify what type of expenses are eligible for sharing requests, so all participants of the ministry HCSM can expect a reasonable and equitable level of sharing requests to be published monthly.</p>' +
  '<p>The ministry is authorized to exclude sharing for pre-existing conditions. You are required to fully disclose pre-existing conditions as part of your participation in the HCSM. The ministry reserves the right to exclude sharing eligibility for any pre-existing conditions, whether disclosed at the time of your enrollment or discovered after the effective date of the membership</p>' +
  '<p>CustomerHealthcareCare</p><ul><li>Pre-existing conditions have a 24-month waiting period</li><li>Cancer diagnoses after enrollment have a 12-month continuous membership requirement before sharing is eligible. This means that if you are diagnosed with cancer after you become a member, you are not eligible to request cost sharing of your expenses until you have been an CustomerHealthcare member for 12 consecutive months.</li><li>There is a maximum limit of $1 million on this Plan</li></ul>' +
  '<p>CarePlus</p><ul><li>Cost sharing does not apply (not eligible) to any illness or accident for which a person has been diagnosed, received medical treatment, been examined, taken medication, or had symptoms within the 24-month period prior to the application date.</li><li>Events covered during the first year of membership become pre-existing condition for the second year, resetting after 24 months.</li></ul>' +
  '<p>InterimCare</p><ul><li>Pre-existing conditions have a 24-month waiting period</li><li>Cancer coverage is provided immediately if a pre-existing cancer condition did not exist within 5 years prior to or at the time of application.</li><li>Charges resulting directly from a pre-existing condition are excluded from cost sharing.</li><li>The pre-existing condition exclusions for Interim Care plans will apply for all members, including those under the age of 19.</li><li>There is a maximum limit of $1 million on this Plan.</li></ul></div>' +
  '<div><h4>Dates of Service</h4><p>The ministry reserves the right to make updates to its Guidelines at any time. The Guidelines in effect at the time of service will supersede all previous versions of the Guidelines. Members will be notified in advance of updates.</p></div>' +
  '<div><h4>Membership Dues and Fees</h4><p>An administrative fee of $25.00 is assigned to administrative costs from each Monthly Share Amount regardless of family size, as provided in the Guidelines. Collection of this fee will begin in the third membership month and will be collected monthly for each following month</p></div>' +
  '<div><h4>Assigned Need</h4><p>The ministry will assign a recommended cost sharing amount to the membership each month (“Monthly Share Amount”). By submitting the Monthly Share Amount, you instruct the ministry to assign your contribution as prescribed by the Guidelines.</p><p>Up to 40% of your member contribution goes towards the administration of this plan and other general overhead costs to successfully carry out the duties of administering these services.</p></div>' +
  '<div><h4>Membership Guidelines Details</h4><p>Each CustomerHealthcare member is responsible for reviewing the HCSM Guidelines provided at the time of enrollment, and to abide by the terms of the Guidelines. It is your responsibility to understand which of your medical expenses are eligible for cost sharing, and which medical expenses are NOT eligible for cost sharing. Members are also provided with a toll-free number to contact Member Services with any questions they have. It is recommended that members call Member Services with any questions regarding eligibility prior to seeking medical services</p></div>' +
  '<div><h4>Authorizations</h4><ul><li>I authorize CustomerHealthcare Healthcare, Inc. (“CustomerHealthcare”), on behalf of the ministry, to collect the Monthly Share Amount as a recurring monthly transaction.</li><li>I authorize my first Monthly Share Amount to be processed immediately upon completion of my enrollment.</li><li>I understand that the enrollment fee will be refunded automatically if all individuals on my enrollment form fail to attest to the ministry Statement of Beliefs or if I withdraw my enrollment prior to my membership effective date</li>' +
  '<li>I understand that the enrollment fee will not be refunded if, in the course of enrolling, I fail to respond to written or verbal inquiries from the ministry or CustomerHealthcare (as the ministry’s administrator) for more than sixty days</li><li>I understand that the ministry offers voluntary participation in the health care sharing ministry, and I understand that CustomerHealthcare owns and administers memberships on behalf of the ministry.</li><li>I understand both CustomerHealthcare and the HCSM have the authorization to contact providers to request the release of medical records on behalf of the member.</li></ul></div>' +
  '<div><h4>Acknowledgment</h4><ul><li>I affirm that the name and personal information provided on this form are true and correct.</li><li>I affirm that I understand and accept the disclosures presented above.</li></ul></div>' +
  '<div><h4>Refunds</h4><p>You are entitled to a full refund, including the one-time enrollment fee, if you cancel your membership within 10 days of the effective date of the membership. You must cancel within 10 days of your effective date to be eligible for a full refund.</p><p>If you are canceling your membership after the first 30 days of your membership, you may be eligible for a refund of the most recently paid membership period, but only if you cancel within 10 days of your scheduled billing date. Any cancellation requests processed more than 10 days from the scheduled billing date will NOT receive a refund, and the membership will remain active until the end of that billing period</p><p>Refunds will be processed as a credit to the same card or account provided for billing. Requests involving refunds payable by check may be delayed up to 30 business days.</p></div>';

// Add a Dependent
export const ABOVE_64_YEARS = ' is not eligible for healthcare sharing. Applicants over the age of 64  are not eligible for healthcare sharing plans.';
export const BELOW_18_YEARS = ' is not eligible for healthcare sharing. Applicants below the age of 18  are not eligible for healthcare sharing plans.';
export const ABOVE_26_YEARS = ' is not eligible as a dependent. Only members under the age of 26 can qualify as dependents.';
export const SIX_MONTHS_TO_64 = ' is eligible for healthcare sharing until {DATE}. Applicants over the age of 64  are not eligible for healthcare sharing plans.';

export const PENDING_ACTIVATION = '<div><span style="color:#034C7B;">Activation will be done after next premium payment.\nFor any assistance please get in touch with Member services at (844) 834-3456.</span></div>';
export const PENDING_INACTIVATION = '<div><span style="color:#034C7B;">Inactivation will be done at the end of current premium cycle.\nFor any assistance please get in touch with Member services at (844) 834-3456.</span></div>';
export const ACTIVE = '<span style="color:#034C7B;">Inactivate Dependent</span>';


// Profile Pic
export const INVALID_FORMAT = 'System accepts only JPEG,PNG images. Please upload any of these image types as profile picture.';
export const BIGGER_IMAGE = 'Image is too big, Please try to upload image with less than 2 MB size';
export const IMAGE_SUCCESS = 'Image uploaded successfully';
export const PAYMENT_RECIPT_NOTfOUND = 'No records found with the given date range';


// Error Messages
export const INVALID_EMAILID = 'Please enter valid EMail ID';
export const INVALID_PHONE = 'Please enter valid phone number';
export const INVALID_ZIP = 'Please enter valid Zip Code';
export const INVALID_CARDNUMBER = 'Please enter a valid Card Number';

// Confirmation Messages
export const REDIRECT_CONFIRMATION_PROVIDER = 'You will be directed to new browser window for searching provider';

// Payment Messages
export const Payment_Cancel_Confirmation = 'Are you sure to cancel the update payment method';
export const Payment_update_Error = 'Unable to update payment. Please try again.';
export const Payment_Change_Confirmation_CC = 'Are you sure to change the payment method to new Credit Card';
export const Payment_Change_Confirmation_ACH = 'Are you sure to change the payment method to new ACH';

// Messages module
export const Msg_Delete_Confirmation = 'Deleted messages cannot be recovered in future.' +
  ' Do you want to delete the selected message(s)?';
export const Msg_Delete_Error = 'No message(s) selected to delete';
export const Msg_Archive_Error = 'No message(s) selected to archive';
export const Msg_Inbox_Error = 'No message(s) selected to move to inbox';
export const Msg_Archive_Confirm = 'Are you sure to archive the selected message(s)?';
export const Msg_Inbox_confirm = 'Are you sure to move the selected message(s) to inbox?';


// Lables or Titles
export const MEDICAL = 'Medical';
export const DENTAL = 'Dental';
export const VISION = 'Vision';

// User profile
export const INACTIVATE_DEPENDENT =
  'Inactivation of dependent will have impact on you premium. \nAre you sure to inactive <b>';
export const CONFORM_INACTIVE = 'Confirmation on Inactivation';
export const REQUEST_SUBMITTED =
  'Your request has been submitted for processing';

export const HEALTH_CONCERNS_TEXT_LENGTH = 250;
export const OTHER_TEXT_LENGTH = 150;

// Address Validation by USPS
export const CONFIRMATION_ON_ADDRESS_CHANGE =
'Your new address is validated and corrected to reflect right details. Please review the address in subscriber information section';
