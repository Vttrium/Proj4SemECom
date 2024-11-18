INSERT INTO tb_category (name) VALUES ('Decoracao');
INSERT INTO tb_category (name) VALUES ('Mesas');
INSERT INTO tb_category (name) VALUES ('Cadeiras');

INSERT INTO tb_theme (name, percentageRise) VALUES ('Móveis Rústicos', 15.0);
INSERT INTO tb_theme (name, percentageRise) VALUES ('Móveis Planejados', 20.0);
INSERT INTO tb_theme (name, percentageRise) VALUES ('Linha Premium', 25.0);
INSERT INTO tb_theme (name, percentageRise) VALUES ('Linha Econômica', 5.0);

INSERT INTO tb_user (name, email, password, created_at, updated_at) VALUES ('dev usuario', 'dev.user@example.com', '$2a$10$M9RmLoXAU3BkNVuJlFs.CeBBmFOeQu1RNC6WToj48MFU7GrsE5saO', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO tb_product (name, description, price, category_id, theme_id) 
VALUES ('Mesa de Madeira Maciça', 'Mesa feita em madeira de alta qualidade com acabamento rústico.', 1500.00, 2, 2);
INSERT INTO tb_product (name, description, price, category_id, theme_id) 
VALUES ('Estante Modular', 'Estante em MDF com montagem personalizada.', 850.00, 2, 3);
INSERT INTO tb_product (name, description, price, category_id, theme_id) 
VALUES ('Cadeira de Escritório', 'Cadeira ergonômica com madeira reflorestada e revestimento de couro.', 450.00, 3, 1);
INSERT INTO tb_product (name, description, price, category_id, theme_id) 
VALUES ('Armário de Cozinha', 'Armário planejado com dobradiças de alta resistência.', 3200.00, 2, 4);
INSERT INTO tb_product (name, description, price, category_id, theme_id) 
VALUES ('Cabeceira de Cama', 'Cabeceira estofada com base em madeira e detalhes decorativos.', 600.00, 1, 2);
INSERT INTO tb_product (name, description, price, category_id, theme_id) 
VALUES ('Painel para TV', 'Painel decorativo com suporte embutido.', 700.00, 2, 1);


