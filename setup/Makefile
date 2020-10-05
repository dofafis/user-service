.PHONY: setup-hosts run tests stop-all

setup-hosts:
	echo '127.0.0.1  frontend.user.com.br' >> /etc/hosts
run:
	docker-compose down
	docker-compose up -d --build
tests:
	docker-compose down
	cd ../user-api/tests;\
	./rebuild_and_run_tests.bash
stop-all:
	docker-compose down
	cd ../user-api/tests;docker-compose down