
-- Inserção das categorias
INSERT INTO tb_category (name) VALUES ('Decoracao');
INSERT INTO tb_category (name) VALUES ('Mesas');
INSERT INTO tb_category (name) VALUES ('Cadeiras');

-- Inserção dos temas
INSERT INTO tb_theme (name, percentage_rise) VALUES ('Móveis Rústicos', 15.0);
INSERT INTO tb_theme (name, percentage_rise) VALUES ('Móveis Planejados', 20.0);
INSERT INTO tb_theme (name, percentage_rise) VALUES ('Linha Premium', 25.0);
INSERT INTO tb_theme (name, percentage_rise) VALUES ('Linha Econômica', 5.0);

-- Inserção do usuário
INSERT INTO tb_user (name, email, password, created_at, updated_at) VALUES ('dev usuario', 'dev.user@example.com', '$2a$10$HBoRMTY.2I5xpNC9ZpSOKO/rhr2dJeev2SQpaHKVKdO4Q/szsfVy2', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Inserção dos produtos
INSERT INTO tb_product (name, description, url_image, price, category_id, theme_id) VALUES ('Mesa de', 'Mesa feita em madeira de alta qualidade com acabamento rústico.', 'https://images.tcdn.com.br/img/img_prod/949872/mesa_bo_link_223_1_dbe4f477f43c59918d79fec5dcff44dc.jpg', 1500.00, 2, 2);

INSERT INTO tb_product (name, description, url_image, price, category_id, theme_id) VALUES ('Estante Modular', 'Estante em MDF com montagem personalizada.', 'https://images.tcdn.com.br/img/img_prod/949872/mesa_bo_link_223_1_dbe4f477f43c59918d79fec5dcff44dc.jpg', 850.00, 2, 3);

INSERT INTO tb_product (name, description, url_image, price, category_id, theme_id) VALUES ('Cadeira de Escritório', 'Cadeira ergonômica com madeira reflorestada e revestimento de couro.', 'https://images.tcdn.com.br/img/img_prod/949872/mesa_bo_link_223_1_dbe4f477f43c59918d79fec5dcff44dc.jpg', 450.00, 3, 1);

INSERT INTO tb_product (name, description, url_image, price, category_id, theme_id) VALUES ('Armário de Cozinha', 'Armário planejado com dobradiças de alta resistência.', 'https://images.tcdn.com.br/img/img_prod/949872/mesa_bo_link_223_1_dbe4f477f43c59918d79fec5dcff44dc.jpg', 3200.00, 2, 4);

INSERT INTO tb_product (name, description, url_image, price, category_id, theme_id) VALUES ('Cabeceira de Cama', 'Cabeceira estofada com base em madeira e detalhes decorativos.', 'https://images.tcdn.com.br/img/img_prod/949872/mesa_bo_link_223_1_dbe4f477f43c59918d79fec5dcff44dc.jpg', 600.00, 1, 2);

INSERT INTO tb_product (name, description, url_image, price, category_id, theme_id) VALUES ('Painel para TV', 'Painel decorativo com suporte embutido.', 'https://images.tcdn.com.br/img/img_prod/949872/mesa_bo_link_223_1_dbe4f477f43c59918d79fec5dcff44dc.jpg', 700.00, 2, 1);
