class TestCase(unittest.TestCase):
    def test1_func2(self):
        test = 0
        self.assertEqual(0, test)


if __name__ == '__main__':
    unittest.main(verbosity=2)
