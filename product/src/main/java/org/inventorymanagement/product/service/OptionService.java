package org.inventorymanagement.product.service;

import java.util.List;
import java.util.Random;

import org.inventorymanagement.product.exceptionhandler.Exceptions.DuplicateOptionNameException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.FormNotFoundException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.InsufficientPermissionException;
import org.inventorymanagement.product.exceptionhandler.Exceptions.OptionNotFoundException;
import org.inventorymanagement.product.model.Form;
import org.inventorymanagement.product.model.Model;
import org.inventorymanagement.product.model.Option;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.OptionRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Repository
public class OptionService {

	/*
	 * 
	 * TODO Verify fields before saving TODO Error Occurs when saving twice on the
	 * same form
	 * 
	 */

	@Autowired
	OptionRepository optionRepository;

	@Autowired
	FormRepository formRepository;

	public Option insertOption(String optionMap, String client) throws JsonMappingException, JsonProcessingException {

		final ObjectMapper mapper = new ObjectMapper();
		final Option option = mapper.readValue(optionMap, Option.class);

		// If New Option
		if (option.get_id() == null || option.get_id().trim().equals("")) {

			// Check if formId and clientName Match
			if (!formRepository.existsBy_idAndClient(option.getFormId(), client)) {
				throw new InsufficientPermissionException();
			}

			// Check if optionName and formId match
			if (optionRepository.existsByNameAndFormId(option.getName(), option.getFormId())) {
				throw new DuplicateOptionNameException();
			}
		}

		// Update Product
		else {

			// Check if formId and clientName match
			if (!formRepository.existsBy_idAndClient(option.getFormId(), client)) {
				throw new InsufficientPermissionException();
			}

			// Check if _id and formId match
			Option oldOption = optionRepository.findBy_idAndFormId(option.get_id(), option.getFormId());
			if (oldOption == null) {
				throw new OptionNotFoundException();
			}

			// Check if optionName and formId match
			if (!oldOption.getName().equals(option.getName())
					&& optionRepository.existsByNameAndFormId(option.getName(), option.getFormId())) {
				throw new DuplicateOptionNameException();
			}
		}

		String candidate = ProductUtils.toSlug(option.getName()) + "-";
		do {
			candidate = candidate + String.valueOf((new Random()).nextInt(10));
		} while (optionRepository.existsByUrl(candidate));

		option.setUrl(candidate);
		return optionRepository.save(option);

	}

	public Option getOptionByUrl(String formUrl, String optionUrl, String client) {
		Form form = formRepository.findByUrlAndModelAndClient(formUrl, Model.OPTION, client);
		if (form == null)
			throw new FormNotFoundException();
		String formId = form.get_id();
		Option option = optionRepository.findByUrlAndFormId(optionUrl, formId);
		if (option == null)
			throw new OptionNotFoundException();
		return option;
	}

	public Option getOptionById(String id) {
		Option option = optionRepository.findById(id).orElse(null);
		if (option == null) {
			throw new OptionNotFoundException();
		}
		return option;
	}

	public void deleteOptions(List<String> uids, String formUrl, String client) {

		String formId = formRepository.findByUrlAndModelAndClient(formUrl, Model.OPTION, client).get_id();
		for (String uid : uids) {
			optionRepository.deleteBy_idAndFormId(uid, formId);
		}
	}

}
