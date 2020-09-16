package org.inventorymanagement.product.service;

import lombok.extern.slf4j.Slf4j;
import org.inventorymanagement.product.exceptionhandler.ProductIdMismatchException;
import org.inventorymanagement.product.exceptionhandler.ProductNotFoundException;
import org.inventorymanagement.product.model.*;
import org.inventorymanagement.product.repository.FormRepository;
import org.inventorymanagement.product.repository.SaleRepository;
import org.inventorymanagement.product.utils.ProductUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Random;

@Slf4j
@Service
public class SalesService {

  @Autowired
  private FormRepository formRepository;

  @Autowired
  private MongoOperations mongoOps;

  @Autowired
  SaleRepository repository;

  public Sale insertSales(Sale sale) {

    String candidate = ProductUtils.toSlug(sale.getSalesId()) + "-";
    do {
      candidate = candidate + (new Random()).nextInt(10);
    } while (repository.existsByUrl(candidate));

    sale.setUrl(candidate);
    sale.setSalesDate(new Date().toString());
    return repository.save(sale);
  }

  public Sale getSaleById(String id) {

    return repository.findBySalesId(id);
  }

  public Sale updateSalesById(String id, Sale sale) {

    if (!sale.getSalesId().equals(id)) {
      throw new ProductIdMismatchException("Sales id  does not match with the request body");
    }
    Sale oldSale = getSaleById(id);
    if (oldSale == null)
      return repository.save(sale);

    sale.set_id(oldSale.get_id());
    return repository.save(sale);
  }

  public Sale getSaleByUrl(String formUrl, String saleUrl, String client) {
    Form form = formRepository.findByUrlAndModelAndClient(formUrl, Model.SALE, client);
    if (form == null)
      throw new ProductNotFoundException("Form Url incorrect");
    String formId = form.get_id();
    Sale sale = repository.findByUrlAndFormId(saleUrl, formId);
    if (sale == null)
      throw new ProductNotFoundException("Url incorrect");
    return sale;
  }

  public void deleteSales(List<String> uids, String formUrl, String client) {

    String formId = formRepository.findByUrlAndModel(formUrl, Model.SALE).get_id();
    for (String uid : uids) {
      repository.deleteBy_idAndFormIdAndClient(uid, formId, client);
    }
  }
}
