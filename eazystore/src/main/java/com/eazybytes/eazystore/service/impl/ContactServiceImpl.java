package com.eazybytes.eazystore.service.impl;

import com.eazybytes.eazystore.constant.ApplicationConstants;
import com.eazybytes.eazystore.dto.ContactRequestDto;
import com.eazybytes.eazystore.dto.ContactResponseDto;
import com.eazybytes.eazystore.entity.Contact;
import com.eazybytes.eazystore.exception.ResourceNotFoundException;
import com.eazybytes.eazystore.repository.ContactRepository;
import com.eazybytes.eazystore.service.IContactService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;


@Slf4j
@Service
@RequiredArgsConstructor
public class ContactServiceImpl implements IContactService {

    private final ContactRepository contactRepository;

    @Override
    public void saveContact(ContactRequestDto contactRequestDto) {
            Contact contact = transformToEntity(contactRequestDto);
            contact.setCreatedAt(Instant.now());
            contact.setCreatedBy(contactRequestDto.getName());
            contactRepository.save(contact);
    }

    @Override
    public List<ContactResponseDto> getAllOpenMessages() {
        List<Contact> contacts = contactRepository.findByStatus(ApplicationConstants.OPEN_MESSAGE);
        return contacts.stream().map(this::mapToContactResponseDTO).collect(Collectors.toList());
    }

    @Override
    public void updateMessageStatus(Long contactId, String status) {
        Contact contact = contactRepository.findById(contactId).orElseThrow(
                () -> new ResourceNotFoundException("Contact", "ContactID", contactId.toString())
        );
        contact.setStatus(status);
        contactRepository.save(contact);
    }

    private ContactResponseDto mapToContactResponseDTO(Contact contact) {
        return new ContactResponseDto(
                contact.getId(),
                contact.getName(),
                contact.getEmail(),
                contact.getMobileNumber(),
                contact.getMessage(),
                contact.getStatus()
        );
    }

    private Contact transformToEntity(ContactRequestDto contactRequestDto) {
        Contact contact = new Contact();
        BeanUtils.copyProperties(contactRequestDto, contact);
        contact.setStatus(ApplicationConstants.OPEN_MESSAGE);
        return contact;
    }

}
