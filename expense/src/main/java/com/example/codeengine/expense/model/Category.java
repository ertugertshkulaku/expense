package com.example.codeengine.expense.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="category")
public class Category {

	@Id
	private Long id;



	@NonNull
	private String name;//Travel..etc

	/*
	 * @ManyToOne(cascade = CascadeType.PERSIST) private User user;
	 */
}
