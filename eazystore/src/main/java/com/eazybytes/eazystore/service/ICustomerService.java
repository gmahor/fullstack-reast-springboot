package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.RegisterReqDto;
import com.eazybytes.eazystore.entity.Customer;

public interface ICustomerService {

    Customer registerCustomer(RegisterReqDto registerReqDto);

}
