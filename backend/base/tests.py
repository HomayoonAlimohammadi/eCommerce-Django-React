from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient
# Import Product Model

class BaseTestCases(TestCase):

    def setUp(self):
        self.client = APIClient()
        # Create a couple of Product instances for testing

    
    def test_product_list_success(self):
        '''
        Test retrieving Product List is successful
        '''
        res = self.client.get('api/products/')

        self.assertEqual(res.status_code, status.HTTP_200_OK)

    
    def test_product_detail_success(self):
        '''
        Test retrieving Product Detail is successful
        '''
        res = self.client.get('api/products/1')

        self.assertEqual(res.status_code, status.HTTP_200_OK)
