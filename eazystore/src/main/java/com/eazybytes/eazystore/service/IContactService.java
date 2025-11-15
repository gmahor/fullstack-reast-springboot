package com.eazybytes.eazystore.service;

import com.eazybytes.eazystore.dto.ContactRequestDto;

public interface IContactService {

    boolean saveContact(ContactRequestDto contactRequestDto);

}
