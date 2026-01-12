package com.github.thiago_lima_costa.imageliteapi.infra.repository;

import com.github.thiago_lima_costa.imageliteapi.domain.entity.Image;
import com.github.thiago_lima_costa.imageliteapi.domain.enums.ImageExtension;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.github.thiago_lima_costa.imageliteapi.infra.repository.specs.ImageSpecs.*;
import static org.springframework.data.jpa.domain.Specification.anyOf;

public interface ImageRepository extends JpaRepository<Image, String>, JpaSpecificationExecutor<Image> {

    default List<Image> findByExtensionAndNameOrTagsLike(ImageExtension extension, String query) {

        // <<< IMPLEMENTAÇÃO DO PROFESSOR, PORÉM WHERE() ESTÁ DEPRECADO >>>
        //Specification<Image> conjunction = (root, q, criteriaBuilder) -> criteriaBuilder.conjunction();
        //Specification<Image> spec = Specification.where(conjunction);

        // <<< NOVA IMPLEMENTAÇÃO >>>
        Specification<Image> spec = Specification.unrestricted();

        if (extension != null) {
            spec = spec.and(extensionEqual(extension));
        }

        if(StringUtils.hasText(query)) {
            spec = spec.and(anyOf(nameLike(query), tagsLike(query)));
        }

        return findAll(spec);
    }

}
