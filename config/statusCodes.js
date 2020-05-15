//=================================================================================================
//===================================1.Informational responses (100–199)===========================
//=================================================================================================
const CONTINUE=100;
const SWITCHING_PROTOCOL=101;
const PROCESSING=102;
const EARLY_HINTS=103;



//=================================================================================================
//=====================================2.Successful responses (200–299),===========================
//=================================================================================================
const OK=200
const CREATED=201 ;
const ACCEPTED=202;
const NON_AUTHORITATIVE_INFORMATION=203;
const NO_CONTENT=204;
const RESET_CONTENT=205
const PARTIAL_CONTENT=206;
const MULTI_STATUS=207;
const ALREADY_REPORTED=208;
const IM_USED=226;

//=================================================================================================
//=====================================3.Redirects (300–399),======================================
//=================================================================================================

const MULTIPLE_CHOICE=300;
const MOVED_PERMANENTLY=301;
const FOUND=302;
const SEE_OTHER=303;
const NOT_MODIFIED=304;
const USE_PROXY=305;
const UNUSED=306;
const TEMPORARY_REDIRECT=307;
const PERMANENT_REDIRECT=308;


//=================================================================================================
//=====================================4.Client errors (400–499),==================================
//=================================================================================================
const BAD_REQUEST=400;
const UNAUTHORIZED=401;
const PAYMENT_REQUIRED=402;
const FORBIDDEN=403;
const NOT_FOUND=404;
const METHOD_NOT_ALLOWED=405;
const NOT_ACCEPTABLE=406;
const PROXY_AUTHENTICATION_REQUIRED=407;
const REQUEST_TIMEOUT=408;
const CONFLICT=409;
const GONE=410;
const LENGTH_REQUIRED=411;
const PRECONDITION_FAILED=412;
const PAYLOAD_TOO_LARGE=413;
const URI_TOO_LONG=414;
const UNSUPPORTED_MEDIA_TYPE=415;
const RANGE_NOT_SATISFIABLE=416;
const EXPECTATION_FAILED=417;
const I_M_A_TEAPOT=418;
const MISDIRECTED_REQUEST=421;
const UNPROCESSABLE_ENTITY=422;
const LOCKED=423;
const FAILED_DEPENDENCY=424;
const TOO_EARLY=425;
const UPGRADE_REQUIRED=426;
const PRECONDITON_REQUIRED=428;
const TOO_MANY_REQUESTS=429;
const REQUEST_HEADER_FIELDS_TOO_LARGE=431;
const UNAVAILABLE_FOR_LEGAL_REASONS=451;

//=================================================================================================
//=====================================5.Server errors (500–599).==================================
//=================================================================================================

const INTERNAL_SERVER_ERROR=500;
const NOT_IMPLEMENTED=501;
const DAB_GATEWAY=502;
const SERVICE_UNAVAILABLE=503;
const GATEWAY_TIMEOUT=504;
const HTTP_VERSION_NOT_SUPPORTED=505;
const VARIANT_ALSO_NEGOTIATES=506;
const INSUFFICIENT_STORAGE=507;
const LOOP_DETECTED=508;
const NOT_EXTENDED=510;
const NETWORK_AUTHENTICATION_REQUIRED=511;



module.exports={
    CONTINUE,
    SWITCHING_PROTOCOL,
    PROCESSING,
    EARLY_HINTS,
   //=================================================================================================
   //=====================================2.Successful responses (200–299),===========================
   //=================================================================================================
    OK,
    CREATED,
    ACCEPTED,
    NON_AUTHORITATIVE_INFORMATION,
    NO_CONTENT,
    RESET_CONTENT,
    PARTIAL_CONTENT,
    MULTI_STATUS,
    ALREADY_REPORTED,
    IM_USED,
   
   //=================================================================================================
   //=====================================3.Redirects (300–399),======================================
   //=================================================================================================
   
    MULTIPLE_CHOICE,
    MOVED_PERMANENTLY,
    FOUND,
    SEE_OTHER,
    NOT_MODIFIED,
    USE_PROXY,
    UNUSED,
    TEMPORARY_REDIRECT,
    PERMANENT_REDIRECT,
   
   
   //=================================================================================================
   //=====================================4.Client errors (400–499),==================================
   //=================================================================================================
    BAD_REQUEST,
    UNAUTHORIZED,
    PAYMENT_REQUIRED,
    FORBIDDEN,
    NOT_FOUND,
    METHOD_NOT_ALLOWED,
    NOT_ACCEPTABLE,
    PROXY_AUTHENTICATION_REQUIRED,
    REQUEST_TIMEOUT,
    CONFLICT,
    GONE,
    LENGTH_REQUIRED,
    PRECONDITION_FAILED,
    PAYLOAD_TOO_LARGE,
    URI_TOO_LONG,
    UNSUPPORTED_MEDIA_TYPE,
    RANGE_NOT_SATISFIABLE,
    EXPECTATION_FAILED,
    I_M_A_TEAPOT,
    MISDIRECTED_REQUEST,
    UNPROCESSABLE_ENTITY,
    LOCKED,
    FAILED_DEPENDENCY,
    TOO_EARLY,
    UPGRADE_REQUIRED,
    PRECONDITON_REQUIRED,
    TOO_MANY_REQUESTS,
    REQUEST_HEADER_FIELDS_TOO_LARGE,
    UNAVAILABLE_FOR_LEGAL_REASONS,
   
   //=================================================================================================
   //=====================================5.Server errors (500–599).==================================
   //=================================================================================================
   
    INTERNAL_SERVER_ERROR,
    NOT_IMPLEMENTED,
    DAB_GATEWAY,
    SERVICE_UNAVAILABLE,
    GATEWAY_TIMEOUT,
    HTTP_VERSION_NOT_SUPPORTED,
    VARIANT_ALSO_NEGOTIATES,
    INSUFFICIENT_STORAGE,
    LOOP_DETECTED,
    NOT_EXTENDED,
    NETWORK_AUTHENTICATION_REQUIRED, 
}



